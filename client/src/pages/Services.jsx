import React from 'react';
import { FaCar, FaHeadset, FaPercent } from 'react-icons/fa';

const Services = () => {
    return (
        <div className="py-12 pt-24">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-semibold text-purple-600 mb-12">
                    Our Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-3 gap-8 justify-center ">
                    {/* Service 1 */}
                    <div className="service-card bg-base-200 p-6 rounded-lg shadow-md border-purple-600 border-s-2 mx-2">
                        <div className="icon mb-6">
                            <div className="text-purple-600 bg-gray-100 rounded-full p-6 inline-block">
                                <FaHeadset size={48} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>
                        <p className=" ">
                        Our dedicated customer support team is available around the clock to assist you with any inquiries or issues you may have.
                         Whether you're booking a car, needing roadside assistance, or have questions about your rental, our team is just a call or click away.
                          We understand that your journey doesn't always fit into a 9-to-5 schedule, which is why we offer 24/7 support.
                         With our seamless and responsive service, you can travel with peace of mind, knowing that help is always within reach.
                          Our commitment is to ensure your rental experience is smooth and stress-free, anytime, anywhere.
                        </p>
                    </div>

                    {/* Service 2 */}
                    <div className="service-card bg-base-200 p-6 rounded-lg shadow-md border-purple-600 border-s-2  mx-2">
                        <div className="icon mb-6">
                            <div className="text-purple-600 bg-gray-100 rounded-full p-6 inline-block">
                                <FaCar size={48} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Corporate Service</h3>
                        <p className="">
                        Our corporate car rental services are tailored to meet the unique needs of businesses of all sizes. We offer flexible rental options, competitive pricing, and a wide range of vehicles to choose from, ensuring that your company’s transportation requirements are met with the highest standards of efficiency and professionalism. Whether you need a fleet of cars for your employees or a single luxury vehicle for a business trip, we provide a hassle-free experience with dedicated account managers and customized solutions. Enhance your business operations with our reliable and convenient corporate services, designed to save you time and money.
                        </p>
                    </div>

                    
                    <div className="service-card bg-base-200 p-6 rounded-lg shadow-md border-purple-600 border-s-2 mx-2">
                        <div className="icon mb-6">
                            <div className="text-purple-600 bg-gray-100 rounded-full p-6 inline-block">
                                <FaPercent size={48} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Special Discounts</h3>
                        <p className="">
                        Enjoy exclusive discounts on our wide selection of vehicles, available to both new and returning customers. Our special discount program is designed to offer significant savings on your car rentals, whether you're booking for a day, a week, or longer. Take advantage of seasonal promotions, loyalty rewards, and last-minute deals to get the best rates possible. Our discounts are available across all vehicle categories, from economy cars to luxury SUVs, ensuring that you get the best value for your money. With our special discount offers, you can drive the car you want at a price you’ll love.

                        </p>
                    </div>
                
                </div>
            </div>
        </div>
    );
};

export default Services;
