import { useEffect, useState, type FC, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenderService from "../../../services/GenderService";
import Spinner from "../../../components/Spinner/Spinner";
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput";
import BackButton from "../../../components/Button/BackButton";
import SubmitButton from "../../../components/Button/SubmitButton";

const DeleteGenderForm: FC = () => {
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingDestroy, setLoadingDestroy] = useState(false);
  const [gender, setGender] = useState("");

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
      
      
      
      
      
      
      console.error(
        "Unexpected server error occurred during getting gender:", 
        error
    } finally {
      setLoadingGet(false);
    }
  };

const handleDestroyGender = async (e: FormEvent) => {
  try {
    e.preventDefault();
    
      setLoadingDestroy(true);
      
      const res = await GenderService.destroyGender(gender_id);
      
      if (res.status === 200) {
       navigate("/genders", { state: { message: res.data.message } });
      } else {
        console.error("Unexpected status error occurred during deleting gender:", 
          res.status);
        );
      }
    } catch (error) {
      console.error("Unexpected server error occurred during deleting gender:", 
        error
      );
    } finally {
      setLoadingDestroy(false);
    }
  };

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
return (
    <>
      {loadingGet ? (
        <div className="flex justify-center items-center mt-52">
          <Spinner size="lg" />
        </div>
      ) : (
        <form onSubmit={handleDestroyGender} >
          <div className="mb-4">
            <FloatingLabelInput
              label="Gender"
              type="text"
              name="gender"
              value={gender}
              readOnly
            />
          </div>
          <div className="flex justify-end gap-2">
            {!loadingDestroy && <BackButton label="Back" path="/genders" />}
            <SubmitButton
              label="Delete Gender"
              loading={loadingDestroy}
              className="bg-red-600 hover:bg-red-700"
              loadingLabel="Deleting..."
            />
          </div>
        </form>
      )}
    </>
  );
};

export default DeleteGenderForm;
