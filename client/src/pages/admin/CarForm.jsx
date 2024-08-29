
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const CarForm = () => {
  const { register, handleSubmit, formState: { errors },setValue} = useForm();
  const {id}=useParams()

  useEffect(() => {
    const fetchCar = async ()=>{
        if (id) { 
             try {
               const response = await axiosInstance.get(`car/single-car/${id}` )
                 const carData=response?.data?.data
                 setValue("brand", carData.brand);
                 setValue("model", carData.model);
                 setValue("year", carData.year);
                 setValue("pricePerDay", carData.pricePerDay);
                 setValue("capacity", carData.capacity);
                 setValue("transmission", carData.transmission);
                 setValue("fuelType", carData.fuelType);
                 setValue("mileage", carData.mileage);
                 
             } catch (error) {
                 toast.error("Error fetching car data");
                 console.log(error);
                 
             }
           
         }
    }

    fetchCar()
  }, [id, setValue]);

  const onSubmit = async(data) => {
    try {
        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('brand', data.brand);
        formData.append('model', data.model);
        formData.append('year', data.year);
        formData.append('pricePerDay', data.pricePerDay);
        formData.append('capacity', data.capacity);
        formData.append('transmission', data.transmission);
        formData.append('fuelType', data.fuelType);
        formData.append('mileage', data.mileage);
        if (data.image?.length > 0) {
            formData.append('image', data.image[0]);
          }
        
          if (id) {
            // If ID exists, update the car
            await axiosInstance.put(`car/update/${id}`, formData, {
            //   headers: {
            //     'Content-Type': 'multipart/form-data',
            //   }
            });
            toast.success('Car updated successfully');
          } else {
            await axiosInstance.post('car/create', formData, );
        toast.success('Car created successfully');
           //{ headers: {'Content-Type': 'multipart/form-data',  }}
          }
   
       
      } catch (error) {
        toast.error( id ? "Error updating car":"error creating car");
        console.log(error);
      }
    
  };

  return (
    <form className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md"  onSubmit={handleSubmit(onSubmit)}  >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
        <div className="form-control">
          <label className="label" htmlFor="brand">
            <span className="label-text">Brand</span>
          </label>
          <input
            type="text"
            
            className="input input-bordered w-full"
            {...register("brand", { required: "Brand is required" })}
          />
          {errors.brand && (
            <span className="text-red-500">{errors.brand.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="model">
            <span className="label-text">Model</span>
          </label>
          <input
            type="text"
           
            className="input input-bordered w-full"
            {...register("model", { required: "Model is required" })}
          />
          {errors.model && (
            <span className="text-red-500">{errors.model.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="year">
            <span className="label-text">Year</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("year", {
              required: "Year is required",
              min: {
                value: 2000, 
                message: "Year cannot be before 2000",
              },
              max: {
                value: new Date().getFullYear(),
                message: `Year cannot be after ${new Date().getFullYear()}`,
              },
            })}
          />
          {errors.year && (
            <span className="text-red-500">{errors.year.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="image">
            <span className="label-text">Image </span>
          </label>
          <input
            type="file"
           
            className="input input-bordered w-full"
            placeholder="Enter comma-separated URLs"
            {...register("image", {
              required: "Image is required",})}
          />
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="pricePerDay">
            <span className="label-text">Price Per Day</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("pricePerDay", {
              required: "Price per day is required",
              min: {
                value: 0,
                message: "Price per day cannot be negative",
              },
            })}
          />
          {errors.pricePerDay && (
            <span className="text-red-500">{errors.pricePerDay.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="capacity">
            <span className="label-text">Capacity</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("capacity", {
              required: "Capacity is required",
              min: {
                value: 1,
                message: "Capacity must be at least 1",
              },
            })}
          />
          {errors.capacity && (
            <span className="text-red-500">{errors.capacity.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="transmission">
            <span className="label-text">Transmission</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("transmission", { required: "Transmission is required" })}
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          {errors.transmission && (
            <span className="text-red-500">{errors.transmission.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="fuelType">
            <span className="label-text">Fuel Type</span>
          </label>
          <select
            className="select select-bordered w-full text-"
            {...register("fuelType", { required: "Fuel type is required" })}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          {errors.fuelType && (
            <span className="text-red-500">{errors.fuelType.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="mileage">
            <span className="label-text">Mileage</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("mileage", {
              required: "Mileage is required",
              min: {
                value: 0,
                message: "Mileage cannot be negative",
              },
            })}
          />
          {errors.mileage && (
            <span className="text-red-500">{errors.mileage.message}</span>
          )}
        </div>
      </div>

      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary w-full">
         {id? "update":"Submit"} 
        </button>
      </div>
    </form>
  );
};

export default CarForm;



