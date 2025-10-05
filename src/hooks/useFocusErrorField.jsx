import { useEffect } from "react";

export default function useFocusFirstErrorField(errors, refs, fieldOrder) {
  useEffect(() => {
    if (!errors || !refs) return;

    const orderedFields = fieldOrder || Object.keys(errors);
    const errorFields = orderedFields.filter((key) => errors[key]);
    if (errorFields.length === 0) return;

    const firstError = errorFields[0];
    const ref = refs[firstError];
    const errorValue = errors[firstError];

    const getErrorIndex = (errorArr) =>
      Array.isArray(errorArr) ? errorArr.findIndex(Boolean) || 0 : 0;

    if (Array.isArray(ref)) {
      const errorIndex = getErrorIndex(errorValue);
      if (ref[errorIndex]?.current) {
        ref[errorIndex].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        ref[errorIndex].current.focus();
      }
    } else if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current.focus();
    }
  }, [errors, refs, fieldOrder]);
}
