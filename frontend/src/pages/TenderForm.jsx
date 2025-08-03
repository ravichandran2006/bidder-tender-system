import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import ReactCountryFlag from "react-country-flag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TenderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [file, setFile] = useState(null);
  const [durationMonths, setDurationMonths] = useState(0);
  const [durationYears, setDurationYears] = useState(0);
  const [formError, setFormError] = useState("");

  // Calculate duration when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Calculate the difference in years and months
      let years = end.getFullYear() - start.getFullYear();
      let months = end.getMonth() - start.getMonth();
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      // Adjust for days if needed (optional)
      if (end.getDate() < start.getDate()) {
        months--;
        if (months < 0) {
          years--;
          months += 12;
        }
      }
      
      setDurationMonths(months);
      setDurationYears(years);
      setValue("durationMonths", months);
      setValue("durationYears", years);
    }
  }, [startDate, endDate, setValue]);

  // Get all countries and format with phone codes
  const countries = Country.getAllCountries().map(country => ({
    ...country,
    phoneCode: `+${country.phonecode}`,
    flag: country.isoCode
  })).sort((a, b) => a.name.localeCompare(b.name));

  // Watch country selections for dependent dropdowns
  const selectedCountry = watch("country");
  const selectedProjectCountry = watch("projectCountry");
  const selectedProjectState = watch("projectState");

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
  ];

  const onSubmit = (data) => {
    if (!file) {
      setFormError("Please upload project documents (PDF)");
      return;
    }
    
    if (!startDate || !endDate) {
      setFormError("Please select both start and end dates");
      return;
    }
    
    setFormError("");
    console.log(data);
    alert("Tender submitted successfully!");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setValue("projectDocuments", selectedFile);
      setFormError("");
    } else {
      setFormError("Please upload a PDF file only.");
    }
  };

  // Custom year dropdown for DatePicker
  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return (
      <span title={tooltipText}>
        {year}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
          Tender Application Form
        </h1>

        {formError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  {...register("firstName", { required: "First name is required" })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  {...register("lastName", { required: "Last name is required" })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  {...register("country", { required: "Country is required" })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode} className="text-black">
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <select
                  {...register("state", { required: "State is required" })}
                  disabled={!selectedCountry}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } ${!selectedCountry ? "bg-gray-50" : ""}`}
                >
                  <option value="">Select State</option>
                  {selectedCountry &&
                    State.getStatesOfCountry(selectedCountry).map((state) => (
                      <option key={state.isoCode} value={state.isoCode} className="text-black">
                        {state.name}
                      </option>
                    ))}
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.state.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <select
                  {...register("city", { required: "City is required" })}
                  disabled={!selectedCountry || !watch("state")}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } ${!selectedCountry || !watch("state") ? "bg-gray-50" : ""}`}
                >
                  <option value="">Select City</option>
                  {selectedCountry && watch("state") &&
                    City.getCitiesOfState(selectedCountry, watch("state")).map((city) => (
                      <option key={city.name} value={city.name} className="text-black">
                        {city.name}
                      </option>
                    ))}
                </select>
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  {...register("pincode", { 
                    required: "Pincode is required",
                    pattern: {
                      value: /^[0-9]{4,10}$/,
                      message: "Invalid pincode format"
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.pincode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.pincode.message}
                  </p>
                )}
              </div>

              {/* Phone with Country Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <div className="flex">
                  <select
                    {...register("countryCode", { required: "Country code is required" })}
                    className={`w-1/3 px-2 py-2 border rounded-l-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                      errors.countryCode ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select</option>
                    {countries.map((country) => (
                      <option key={country.phonecode} value={country.phoneCode}>
                        <div className="flex items-center">
                          <ReactCountryFlag
                            countryCode={country.isoCode}
                            svg
                            style={{
                              width: "1em",
                              height: "1em",
                              marginRight: "0.5em"
                            }}
                          />
                          {country.name} ({country.phoneCode})
                        </div>
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    {...register("phone", { 
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{8,15}$/,
                        message: "Invalid phone number"
                      }
                    })}
                    className={`flex-1 px-3 py-2 border-t border-b border-r rounded-r-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.type === "required"
                      ? "This field is required."
                      : "Invalid email address."}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Project Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Project Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Project Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  {...register("projectName", { required: "Project name is required" })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.projectName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.projectName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.projectName.message}
                  </p>
                )}
              </div>

              {/* Project Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Country *
                </label>
                <select
                  {...register("projectCountry", { required: "Project country is required" })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.projectCountry ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode} className="text-black">
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.projectCountry && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.projectCountry.message}
                  </p>
                )}
              </div>

              {/* Project State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project State *
                </label>
                <select
                  {...register("projectState", { required: "Project state is required" })}
                  disabled={!selectedProjectCountry}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.projectState ? "border-red-500" : "border-gray-300"
                  } ${!selectedProjectCountry ? "bg-gray-50" : ""}`}
                >
                  <option value="">Select State</option>
                  {selectedProjectCountry &&
                    State.getStatesOfCountry(selectedProjectCountry).map((state) => (
                      <option key={state.isoCode} value={state.isoCode} className="text-black">
                        {state.name}
                      </option>
                    ))}
                </select>
                {errors.projectState && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.projectState.message}
                  </p>
                )}
              </div>

              {/* Project District/City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project District *
                </label>
                <select
                  {...register("projectDistrict", { required: "Project district is required" })}
                  disabled={!selectedProjectCountry || !selectedProjectState}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.projectDistrict ? "border-red-500" : "border-gray-300"
                  } ${!selectedProjectCountry || !selectedProjectState ? "bg-gray-50" : ""}`}
                >
                  <option value="">Select District</option>
                  {selectedProjectCountry && selectedProjectState &&
                    City.getCitiesOfState(selectedProjectCountry, selectedProjectState).map((city) => (
                      <option key={city.name} value={city.name} className="text-black">
                        {city.name}
                      </option>
                    ))}
                </select>
                {errors.projectDistrict && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.projectDistrict.message}
                  </p>
                )}
              </div>

              {/* Project Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Pincode *
                </label>
                <input
                  type="text"
                  {...register("projectPincode", { 
                    required: "Pincode is required",
                    pattern: {
                      value: /^[0-9]{4,10}$/,
                      message: "Invalid pincode format"
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.projectPincode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.projectPincode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.projectPincode.message}
                  </p>
                )}
              </div>

              {/* Project Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Address *
                </label>
                <textarea
                  {...register("projectAddress", { required: "Project address is required" })}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.projectAddress ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.projectAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.projectAddress.message}
                  </p>
                )}
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setValue("startDate", date);
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select start date"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.startDate ? "border-red-500" : "border-gray-300"
                  }`}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={15}
                  renderYearContent={renderYearContent}
                  required
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">
                    Start date is required
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date *
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    setValue("endDate", date);
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Select end date"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                    errors.endDate ? "border-red-500" : "border-gray-300"
                  }`}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={15}
                  renderYearContent={renderYearContent}
                  required
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-600">
                    End date is required
                  </p>
                )}
              </div>

              {/* Duration (auto-calculated) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (Years)
                </label>
                <input
                  type="number"
                  value={durationYears}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (Months)
                </label>
                <input
                  type="number"
                  value={durationMonths}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-black"
                />
              </div>

              {/* Project Documents */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Documents (PDF only) *
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="projectDocuments"
                    required
                  />
                  <label
                    htmlFor="projectDocuments"
                    className={`px-4 py-2 bg-blue-50 text-blue-700 rounded-l-md border border-r-0 cursor-pointer hover:bg-blue-100 text-black ${
                      errors.projectDocuments ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    Choose File
                  </label>
                  <div className={`flex-1 px-4 py-2 border rounded-r-md bg-gray-50 truncate text-black ${
                    errors.projectDocuments ? "border-red-500" : "border-gray-300"
                  }`}>
                    {file ? file.name : "No file chosen"}
                  </div>
                </div>
                {errors.projectDocuments && (
                  <p className="mt-1 text-sm text-red-600">
                    Project documents are required
                  </p>
                )}
              </div>

              {/* Estimated Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Amount *
                </label>
                <div className="flex">
                  <input
                    type="number"
                    step="100000"
                    {...register("estimatedAmount", { 
                      required: "Amount is required",
                      min: { value: 0, message: "Amount must be positive" }
                    })}
                    className={`flex-1 px-3 py-2 border rounded-l-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                      errors.estimatedAmount ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <select
                    {...register("currency", { required: "Currency is required" })}
                    className={`w-1/3 px-2 py-2 border-t border-b border-r rounded-r-md focus:ring-blue-500 focus:border-blue-500 text-black ${
                      errors.currency ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code} className= "text-black" >
                        {currency.symbol} ({currency.code})
                      </option>
                    ))}
                  </select>
                </div>
                {errors.estimatedAmount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.estimatedAmount.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Additional Information
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black "
                placeholder="Provide additional details about your tender..."
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("terms", { required: "You must accept the terms" })}
              className={`h-4 w-4 text-blue-600 focus:ring-blue-500 rounded ${
                errors.terms ? "border-red-500" : "border-gray-300"
              }`}
              id="terms"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the terms and conditions *
            </label>
          </div>
          {errors.terms && (
            <p className="mt-1 text-sm text-red-600">
              {errors.terms.message}
            </p>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Submit Tender
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenderForm;