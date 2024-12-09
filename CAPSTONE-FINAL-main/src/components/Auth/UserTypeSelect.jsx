const UserTypeSelect = ({ userType, onChange }) => (
    <div className="flex flex-col  w-full">
      <label className="flex w-full items-center content-center justify-center block text-2xl font-semibold mb-5">Select User Type</label>
      <select
        value={userType}
        onChange={onChange}
        className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Select...</option>
        <option value="Guardian">Guardian</option>
        <option value="Pediatrician">Pediatrician</option>
        <option value="Admin">Admin</option>
      </select> 
    </div>
  );
  
  export default UserTypeSelect;
  