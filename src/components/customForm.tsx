import React, { useState, useEffect } from "react";
import { Input, Button } from "digitinary-ui";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  country: string;
  age: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  country?: string;
  age?: string;
  agreeToTerms?: string;
}

interface TouchedFields {
  fullName: boolean;
  email: boolean;
  password: boolean;
  country: boolean;
  age: boolean;
  agreeToTerms: boolean;
}

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "OIC", name: "Jordan" },
  { code: "IN", name: "India" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "OIC", name: "Syria" },
];

const validateForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.fullName) {
    errors.fullName = "Full name is required";
  } else if (values.fullName.length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.country) {
    errors.country = "Country is required";
  }

  if (!values.age) {
    errors.age = "Age is required";
  } else if (isNaN(Number(values.age))) {
    errors.age = "Age must be a number";
  } else if (Number(values.age) < 18) {
    errors.age = "You must be at least 18 years old";
  } else if (Number(values.age) > 120) {
    errors.age = "Please enter a valid age";
  }

  if (!values.agreeToTerms) {
    errors.agreeToTerms = "You must agree to the terms";
  }

  return errors;
};

const CustomForm: React.FC = () => {
  const initialValues: FormValues = {
    fullName: "",
    email: "",
    password: "",
    country: "",
    age: "",
    agreeToTerms: false,
  };

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    fullName: false,
    email: false,
    password: false,
    country: false,
    age: false,
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Revalidate the form whenever `values` change
  useEffect(() => {
    const newErrors = validateForm(values);
    setErrors(newErrors);
  }, [values]);

  const handleChange = (name: string, value: string | boolean) => {
    // Update the form values
    setValues({
      ...values,
      [name]: value,
    });

    // Mark the field as touched
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleBlur = (name: string) => {
    // Mark the field as touched when it loses focus
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched when the form is submitted
    setTouched({
      fullName: true,
      email: true,
      password: true,
      country: true,
      age: true,
      agreeToTerms: true,
    });

    // Validate the form
    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        alert("Form submitted successfully!");
        setIsSubmitting(false);
        // Reset the form to its initial state
        setValues(initialValues);
        setTouched({
          fullName: false,
          email: false,
          password: false,
          country: false,
          age: false,
          agreeToTerms: false,
        });
      }, 1000);
    }
  };

  // Check if the form is valid
  const isFormValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit}>
      {/* Full Name Input */}
      <div>
        <Input
          type="text"
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          value={values.fullName}
          onChange={(value: string) => handleChange("fullName", value)}
          onBlur={() => handleBlur("fullName")}
          errorMsg={touched.fullName && errors.fullName ? errors.fullName : ""}
          helperText="Please enter your full name as it appears on your ID."
        />
      </div>

      {/* Email Input */}
      <div>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={values.email}
          onChange={(value: string) => handleChange("email", value)}
          onBlur={() => handleBlur("email")}
          errorMsg={touched.email && errors.email ? errors.email : ""}
          helperText="We'll never share your email with anyone else."
        />
      </div>

      {/* Password Input */}
      <div>
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={values.password}
          onChange={(value: string) => handleChange("password", value)}
          onBlur={() => handleBlur("password")}
          errorMsg={touched.password && errors.password ? errors.password : ""}
          helperText="Password must be at least 6 characters long."
        />
      </div>

      {/* Country Select */}
      <div>
        <label>Country</label>
        <select
          name="country"
          value={values.country}
          onChange={(e) => handleChange("country", e.target.value)}
          onBlur={() => handleBlur("country")}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="">Select your country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        {touched.country && errors.country && (
          <span style={{ color: "red" }}>{errors.country}</span>
        )}
        <span style={{ color: "#666", fontSize: "12px" }}>
          Please select your country of residence.
        </span>
      </div>

      {/* Age Input */}
      <div>
        <Input
          type="text"
          name="age"
          label="Age"
          placeholder="Enter your age"
          value={values.age}
          onChange={(value: string) => handleChange("age", value)}
          onBlur={() => handleBlur("age")}
          errorMsg={touched.age && errors.age ? errors.age : ""}
          helperText="You must be at least 18 years old to register."
        />
      </div>

      {/* Agree to Terms Checkbox */}
      <div>
        <label>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={values.agreeToTerms}
            onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
            onBlur={() => handleBlur("agreeToTerms")}
          />
          I agree to the terms and conditions
        </label>
        {touched.agreeToTerms && errors.agreeToTerms && (
          <span style={{ color: "red" }}>{errors.agreeToTerms}</span>
        )}
        <span style={{ color: "#666", fontSize: "12px" }}>
          You must agree to the terms and conditions to proceed.
        </span>
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting || !isFormValid}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default CustomForm;