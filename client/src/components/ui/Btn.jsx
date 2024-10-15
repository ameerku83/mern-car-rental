// src/components/CustomButton.js


const Btn = ({ children,onClick }) => {
  return (
    <button className="btn bg-purple-500 text-white hover:bg-purple-600    rounded-md transition ease-in-out"
   
    onClick={onClick}
    >
      {children}
      
 
</button>
  );
};

export default Btn;
