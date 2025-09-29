import { useState } from "react";
import { validate } from "../utils/formValidation";

function getFieldValue(e, field) {
  return field === "accepted" ? e.target.checked : e.target.value;
}

function getMultipleChoice(selectedOptions, option) {
  return selectedOptions.includes(option)
    ? selectedOptions.filter((o) => o !== option)
    : [...selectedOptions, option];
}

function getValidationErrors(formData, field, value) {
  return {
    ...validate({ ...formData, [field]: value }),
  }[field];
}

export default function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [visitedFields, setVisitedFields] = useState({});

  const handleChange = (field) => (e) => {
    const value = getFieldValue(e, field);
    setFormData((f) => ({ ...f, [field]: value }));

    if (visitedFields[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: getValidationErrors(formData, field, value),
      }));
    }
  };

  const handleMultipleChoice = (option, field = "interests") => {
    const selected = getMultipleChoice(formData[field], option);

    setFormData((prev) => ({
      ...prev,
      [field]: selected,
    }));

    if (visitedFields[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: getValidationErrors(formData, field, selected),
      }));
    }
  };

  const handleBlur = (field) => () => {
    if (!visitedFields[field]) {
      setVisitedFields((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({
        ...prev,
        [field]: validate(formData)[field],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: validate(formData)[field],
      }));
    }
  };

  const handleBlurMultipleChoice = (field = "interests") => {
    if (!visitedFields[field]) {
      setVisitedFields((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({
        ...prev,
        [field]: validate(formData)[field],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: validate(formData)[field],
      }));
    }
  };

  const handleAdditionalCommentsChange = (e, field = "additionalComments") => {
    const value = e.target.value.slice(0, 500);
    setFormData((f) => ({ ...f, [field]: value }));
    if (visitedFields[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validate({
          ...formData,
          [field]: value,
        })[field],
      }));
    }
  };

  const handleSubmit = (onSuccess) => (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setVisitedFields(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    if (Object.keys(validationErrors).length === 0 && onSuccess) {
      onSuccess(formData);
    }
  };

  return {
    formData,
    errors,
    visitedFields,
    handleChange,
    handleMultipleChoice,
    handleBlur,
    handleBlurMultipleChoice,
    handleAdditionalCommentsChange,
    handleSubmit,
    setFormData,
    setErrors,
    setVisitedFields,
  };
}
