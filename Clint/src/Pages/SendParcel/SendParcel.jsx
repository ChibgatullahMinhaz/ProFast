import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router";
import "./parcel.css";
import axiosSecure from "../../api/axiosSecure";
import useAuth from "../../Hooks/useAuth";
const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

const SendParcel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const serviceCenters = useLoaderData();

  // Extract unique regions
  const uniqueRegions = [...new Set(serviceCenters?.map((w) => w.region))];
  // Get districts by region
  const getDistrictsByRegion = (region) =>
    serviceCenters?.filter((w) => w.region === region)?.map((w) => w.district);

  const parcelType = watch("type");
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  const onSubmit = (data) => {
    const weight = parseFloat(data.weight) || 0;
    const isSameDistrict = data.sender_center === data.receiver_center;

    let baseCost = 0;
    let extraCost = 0;
    let breakdown = "";

    if (data.type === "document") {
      baseCost = isSameDistrict ? 60 : 80;
      breakdown = `Document delivery ${
        isSameDistrict ? "within" : "outside"
      } the district.`;
    } else {
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;
        breakdown = `Non-document up to 3kg ${
          isSameDistrict ? "within" : "outside"
        } the district.`;
      } else {
        const extraKg = weight - 3;
        const perKgCharge = extraKg * 40;
        const districtExtra = isSameDistrict ? 0 : 40;
        baseCost = isSameDistrict ? 110 : 150;
        extraCost = perKgCharge + districtExtra;
        breakdown = `
        Non-document over 3kg ${
          isSameDistrict ? "within" : "outside"
        } the district.<br/>
        Extra charge: ৳40 x ${extraKg.toFixed(1)}kg = ৳${perKgCharge}<br/>
        ${districtExtra ? "+ ৳40 extra for outside district delivery" : ""}
      `;
      }
    }

    const totalCost = baseCost + extraCost;

    Swal.fire({
      title: "Delivery Cost Breakdown",
      icon: "info",
      html: `
      <div class="text-left text-base space-y-2">
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Delivery Zone:</strong> ${
          isSameDistrict ? "Within Same District" : "Outside District"
        }</p>
        <hr class="my-2"/>
        <p><strong>Base Cost:</strong> ৳${baseCost}</p>
        ${
          extraCost > 0
            ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>`
            : ""
        }
        <div class="text-gray-500 text-sm">${breakdown}</div>
        <hr class="my-2"/>
        <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
      </div>

      
    `,
      showDenyButton: true,
      confirmButtonText: "💳 Proceed to Payment",
      cancelButtonText: "✏️ Continue Editing",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#d3d3d3",
      showCancelButton: true,
      denyButtonText: "💸 Cash on Delivery",
      cancelButtonColor: "#facc15", // yellow
      customClass: {
        popup: "rounded-xl shadow-md px-6 py-6",
      },
    }).then((result) => {
      const parcelData = {
        ...data,
        sender_email: user?.email,
        cost: totalCost,
        payment_status: result.isConfirmed ? "unpaid" : "cod",
        delivery_status: "not_collected",
        creation_date: new Date().toISOString(),
        tracking_id: generateTrackingID(),
      };

      if (result.isConfirmed) {
        // Online Payment Flow
        axiosSecure
          .post("/parcels", parcelData)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Redirecting...",
                text: "Proceeding to payment gateway.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              reset();
              navigate("/user/dashboard/customer/my-bookings");
            } else {
              Swal.fire(
                "Something went wrong",
                "Could not create parcel",
                "error"
              );
            }
          })
          .catch((error) => {
            Swal.fire(
              "Server Error",
              "Failed to submit parcel. Please try again.",
              "error"
            );
            console.error(error);
          });
      } else if (result.isDenied) {
        // COD Flow
        axiosSecure
          .post("/parcels", parcelData)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Parcel Created (COD)",
                text: "Cash on Delivery order submitted!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              reset();
              navigate("/user/dashboard/customer/my-bookings");
            } else {
              Swal.fire(
                "Something went wrong",
                "Could not create parcel",
                "error"
              );
            }
          })
          .catch((error) => {
            Swal.fire(
              "Server Error",
              "Failed to submit parcel. Please try again.",
              "error"
            );
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Heading */}
        <div className="text-center text">
          <h2 className="text-3xl font-bold">Send a Parcel</h2>
          <p className="text-gray-500">Fill in the details below</p>
        </div>

        {/* Parcel Info */}
        <div className="border p-4 rounded-xl shadow-md space-y-4">
          <h3 className="font-semibold text-xl">Parcel Info</h3>
          <div className="space-y-4">
            {/* Parcel Name */}
            <div className="inputForm">
              <label className="label font-bold">Parcel Name: </label>
              <input
                {...register("title", { required: true })}
                className="input bg-gray-100"
                placeholder="Describe your parcel"
              />
            </div>
            {errors.title && (
              <p className="text-red-500 text-sm">Parcel name is required</p>
            )}

            {/* Type */}
            <div>
              <label className="label font-bold">Type: </label>
              <div className="inputForm">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="document"
                      {...register("type", { required: true })}
                      className="radio text"
                    />
                    Document
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="non-document"
                      {...register("type", { required: true })}
                      className="radio"
                    />
                    Non-Document
                  </label>
                </div>
              </div>
              {errors.type && (
                <p className="text-red-500 text-sm">Type is required</p>
              )}
            </div>

            {/* Weight */}
            <div className="inputForm">
              <label className="label">Weight (kg) :</label>
              <input
                type="number"
                step="0.1"
                {...register("weight")}
                disabled={parcelType !== "non-document"}
                className={`input bg-gray-100 w-full ${
                  parcelType !== "non-document"
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
                placeholder="Enter weight"
              />
            </div>
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="border p-4 rounded-xl shadow-md space-y-4">
            <h3 className="font-semibold text-xl">Sender Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <label htmlFor="name" className="block font-semibold">
                Full Name:
              </label>
              <div className="inputForm bg-gray-100">
                <input
                  {...register("sender_name", { required: true })}
                  className="input w-full "
                  placeholder="Name"
                />
              </div>
              {errors.sender_name && (
                <p className="text-red-500 text-sm">Sender name is required</p>
              )}
              <label htmlFor="contact" className="block font-semibold">
                Contact:
              </label>
              <div className="inputForm bg-gray-100">
                <input
                  {...register("sender_contact", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Contact"
                />
              </div>
              {errors.sender_contact && (
                <p className="text-red-500 text-sm">
                  sender Contact is required
                </p>
              )}
              <label htmlFor="contact" className="block font-semibold">
                Region:
              </label>
              <div className="inputForm bg-gray-100">
                <select
                  {...register("sender_region", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {uniqueRegions?.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              {errors.sender_region && (
                <p className="text-red-500 text-sm">
                  sender Region is required
                </p>
              )}
              <label htmlFor="Service Center" className="block font-semibold">
                Service Center:
              </label>
              <div className="inputForm bg-gray-100">
                <select
                  {...register("sender_center", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Service Center</option>
                  {getDistrictsByRegion(senderRegion)?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              {errors.sender_center && (
                <p className="text-red-500 text-sm">
                  sender Region is required
                </p>
              )}
              <label htmlFor="Address" className="block font-semibold">
                Address:
              </label>
              <div className="inputForm bg-gray-100">
                <input
                  {...register("sender_address", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Address"
                />
              </div>
              {errors.sender_address && (
                <p className="text-red-500 text-sm">
                  sender sender address is required
                </p>
              )}
              <label htmlFor="Instruction" className="block font-semibold">
                Pickup Instruction:
              </label>
              <textarea
                {...register("pickup_instruction", { required: true })}
                className="textarea textarea-bordered w-full bg-gray-100"
                placeholder="Pickup Instruction"
              />
              {errors.pickup_instruction && (
                <p className="text-red-500 text-sm">
                  sender pickup instruction is required
                </p>
              )}
            </div>
          </div>

          {/* Receiver Info */}
          <div className="border p-4 rounded-xl shadow-md space-y-4">
            <h3 className="font-semibold text-xl">Receiver Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <label htmlFor="Instruction" className="block font-semibold">
                Receiver Name:
              </label>
              <div className="inputForm bg-gray-100">
                <input
                  {...register("receiver_name", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Name"
                />
              </div>
              {errors.receiver_name && (
                <p className="text-red-500 text-sm">
                  Receiver Name is required
                </p>
              )}
              <label htmlFor="Instruction" className="block font-semibold">
                Receiver Contact:
              </label>
              <div className="inputForm bg-gray-100">
                <input
                  {...register("receiver_contact", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Contact"
                />
              </div>
              {errors.receiver_contact && (
                <p className="text-red-500 text-sm">
                  Receiver contact is required
                </p>
              )}
              <label htmlFor="receiver region" className="block font-semibold">
                Receiver Region:
              </label>
              <div className="inputForm bg-gray-100">
                <select
                  {...register("receiver_region", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {uniqueRegions?.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              {errors.receiver_region && (
                <p className="text-red-500 text-sm">
                  Receiver region is required
                </p>
              )}
              <label htmlFor="receiver center" className="block font-semibold">
                Receiver Center:
              </label>
              <div className="inputForm bg-gray-100">
                <select
                  {...register("receiver_center", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Service Center</option>
                  {getDistrictsByRegion(receiverRegion)?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              {errors.receiver_center && (
                <p className="text-red-500 text-sm">
                  Receiver center is required
                </p>
              )}
              <label htmlFor="Instruction" className="block font-semibold">
                Receiver Address:
              </label>
              <div className="inputForm bg-gray-100">
                <input
                  {...register("receiver_address", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Address"
                />
              </div>
              {errors.receiver_address && (
                <p className="text-red-500 text-sm">
                  Receiver address is required
                </p>
              )}
              <label
                htmlFor="Delivery Instruction"
                className="block font-semibold"
              >
                Delivery Instruction:
              </label>
              <textarea
                {...register("delivery_instruction", { required: true })}
                className="textarea textarea-bordered w-full bg-gray-100"
                placeholder="Delivery Instruction"
              />
              {errors.delivery_instruction && (
                <p className="text-red-500 text-sm">
                  delivery instruction is required
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}

        <button className=" sendBtn w-full cursor-pointer border-2 border-pink-400">
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
