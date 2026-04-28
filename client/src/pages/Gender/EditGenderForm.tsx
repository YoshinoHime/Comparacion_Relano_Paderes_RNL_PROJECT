import { useEffect, useState, type FC, type FormEvent } from "react";
import BackButton from "../../../components/Button/BackButton";
import SubmitButton from "../../../components/Button/SubmitButton";
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput";
import GenderService from "../../../services/GenderService";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import type { GenderFieldErrors } from "../../../interfaces/GenderInterface";

interface EditGenderFormProps {
  onGenderUpdated: (message: string) => void;
}

const EditGenderForm: FC<EditGenderFormProps> = ({ onGenderUpdated }) => {
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState<GenderFieldErrors>({});

  const { gender_id } = useParams<{ gender_id: string }>();
  const navigate = useNavigate();

  const handleGetGender = async (genderId: string) => {
    try {
      setLoadingGet(true);
      const res = await GenderService.getGender(genderId);
      if (res.status === 200) {
        setGender(res.data.gender.gender);
      } else {
        console.error("Unexpected status error occurred during getting gender:", res.status);
      }
    } catch (error) {
      console.error("Unexpected server error occurred during getting gender:", error);
    } finally {
      setLoadingGet(false);
    }
  };

  useEffect(() => {
    if (gender_id) {
      handleGetGender(gender_id);
    }
  }, [gender_id]);

  const handleUpdateGender = async (e: FormEvent) => {
    e.preventDefault();
    if (!gender_id) return;

    setLoadingUpdate(true);
    setErrors({});

    try {
      const res = await GenderService.updateGender(gender_id, { gender });
      if (res.status === 200) {
        onGenderUpdated(res.data.message);
        navigate("/genders"); 
      }
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error updating gender:", error);
      }
    } finally {
      setLoadingUpdate(false);
    }
  };

  if (loadingGet) {
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
  <form onSubmit={handleUpdateUser}>
    <h1 className="text-2xl border-b border-gray-100 p-4 font-semibold mb-4">
      Edit User Form
    </h1>

    <div className="p-4 overflow-y-auto max-h-[70vh]">
      <div className="grid grid-cols-2 gap-4 border-b border-gray-100 mb-4 pb-4">
       
        <div className="col-span-2 md:col-span-1">
          <FloatingLabelInput
            label="First Name"
            type="text"
             <>
      {loadingGet ? (
        <div className="flex justify-center items-center mt-52">
          <Spinner size="lg" />
        </div>
      ) : (
        <form onSubmit={handleUpdateGender}>
          <div className="mb-4">
            <FloatingLabelInput
              label="Gender"
              type="text"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              errors={errors.gender}
              required
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2">
            {!loadingUpdate && <BackButton label="Back" path="/genders" />}
            <SubmitButton
              label="Update Gender"
              loading={loadingUpdate}
              loadingLabel="Updating Gender..."
            />
          </div>
        </form>
      )}
    </>
  );
};

export default EditGenderForm;