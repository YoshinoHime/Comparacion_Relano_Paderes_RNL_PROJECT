import { useState, type FC, type FormEvent } from "react";
import SubmitButton from "../../../components/Button/SubmitButton";
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput";
import GenderService from "../../../services/GenderService";
import type { GenderFieldErrors } from "../../../interfaces/GenderInterface";

interface AddGenderFormProps {
  onGenderAdded: (message: string) => void;
  refreshKey: () => void;
}

const AddGenderForm: FC<AddGenderFormProps> = ({
  onGenderAdded,
  refreshKey,
}) => {
  const [loadingStore, setLoadingStore] = useState(false);
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState<GenderFieldErrors>({});

  const handleStoreGender = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoadingStore(true);

    try {
      const res = await GenderService.storeGender({ gender });
      
      if (res.status === 200 || res.status === 201) {
        setGender("");
        setErrors({});
        onGenderAdded(res.data.message);
        refreshKey();
      } else {
        console.error("Unexpected error occurred during store gender:", res.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Internal Server Error:", error);
      }
    } finally {
      setLoadingStore(false);
    }
  };

  return (
    <form onSubmit={handleStoreGender} className="space-y-4">
      <FloatingLabelInput
        label="Gender Name"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        error={errors.gender ? errors.gender[0] : ""}
      />
      
      <div className="flex justify-end">
        <SubmitButton 
          loading={loadingStore} 
          title="Add Gender" 
        />
      </div>
    </form>
  );
};

export default AddGenderForm;
