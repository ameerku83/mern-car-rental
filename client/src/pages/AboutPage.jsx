import React from 'react';
import { FaCar, FaHeadset, FaMapMarkedAlt, FaUserShield } from 'react-icons/fa';
import diagram from './../asets/images/diagram.png'
const AboutPage = () => {
    return (
        <div className="py-12 pt-24 ">
            <div className="max-w-7xl mx-auto px-4">
                {/* About Section */}
                <section className="text-center mb-16">
                    <h2 className="text-4xl font-semibold text-purple-600 mb-8">
                        About Our Car Rental Service
                    </h2>
                    <p className="text-lg ">
                     We pride ourselves on providing exceptional car rental services to meet all your travel needs. Whether you're planning a business trip, a family vacation, or just need a reliable vehicle for everyday use, we have the perfect car for you. Our fleet consists of a wide variety of vehicles, from economy cars to luxury sedans, all maintained to the highest standards to ensure your comfort and safety.
                    </p>
                </section>

               
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    
                    <div className=" bg-base-200 p-6 rounded-lg shadow-md flex items-center border-purple-600 border-s-2 ">
                        <div className="text-purple-600 bg-gray-100 rounded-full p-6 mr-6">
                            <FaHeadset size={48} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2 ">24/7 Customer Support</h3>
                            <p className="">
                                Our dedicated support team is available around the clock to assist you with any issues or inquiries. We ensure your rental experience is smooth and hassle-free.
                            </p>
                        </div>
                    </div>

                    {/* Service 2 */}
                    <div className="bg-base-200 p-6 rounded-lg shadow-md flex items-center border-purple-600 border-s-2 ">
                        <div className="text-purple-600 bg-gray-100 rounded-full p-6 mr-6">
                            <FaCar size={48} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2 ">Wide Range of Vehicles</h3>
                            <p className="">
                                From compact cars to luxury vehicles, we offer a diverse selection of cars to suit every occasion. All our vehicles are regularly serviced and kept in pristine condition.
                            </p>
                        </div>
                    </div>

                    {/* Service 3 */}
                    <div className="bg-base-200 p-6 rounded-lg shadow-md flex items-center border-purple-600 border-s-2 ">
                        <div className="text-purple-600 bg-gray-100 rounded-full p-6 mr-6">
                            <FaUserShield size={48} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Safety & Security</h3>
                            <p className="">
                                Your safety is our top priority. Our vehicles are equipped with the latest safety features, and we provide comprehensive insurance options to give you peace of mind on the road.
                            </p>
                        </div>
                    </div>

                    {/* Service 4 */}
                    <div className="bg-base-200 p-6 rounded-lg shadow-md flex items-center border-purple-600 border-s-2 ">
                        <div className="text-purple-600 bg-gray-100 rounded-full p-6 mr-6">
                            <FaMapMarkedAlt size={48} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Convenient Locations</h3>
                            <p className="">
                                We have rental locations in major cities and airports, making it easy for you to pick up and drop off your vehicle wherever you are. Our locations are conveniently situated to serve you better.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Diagram Section */}
                <section className="mb-10 bg-base-200 shadow rounded border-purple-600 border-s-2 ">
                    <h3 className="text-3xl font-bold text-center text-purple-600 mb-4 mt-4">How It Works</h3>
                    <div className="flex flex-col md:flex-row items-center justify-between m-4">
                        <img src={diagram} alt="Diagram" className=" md:mb-0 w-96 rounded-lg shadow-md object-contain" />
                        <div className="md:w-2/3 md:pl-12 ">
                            <p className="text-lg">
                                Renting a car with us is simple. Select your vehicle online, choose your pick-up and drop-off locations, and drive away in comfort and style. Our user-friendly platform makes it easy to manage your booking and get on the road quickly.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Customer Support Section */}
                <section className="text-center ">
                    <h3 className="text-3xl font-bold text-purple-600 mb-8">We're Here to Help</h3>
                    <p className="text-lg  max-w-2xl mx-auto">
                        Our customer support team is available 24/7 to assist you with any questions or concerns. Whether you need help with booking, have questions about our vehicles, or require roadside assistance, we're just a phone call away.
                    </p>
                </section>
            </div>
            
        </div>
    );
};

export default AboutPage;
