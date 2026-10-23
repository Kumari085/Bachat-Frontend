import { useState } from "react";
import { getGoal, createGoal, deleteGoal ,addAmountToGoal,updateGoal} from "../services/goal.service";

export const useGoal = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGoals = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getGoal();

            setGoals(data.goals);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const addGoal = async ({ name, targetAmount, currentAmount, deadline }) => {
        setLoading(true);
        setError(null);

        try {
            const data = await createGoal({ name, targetAmount, currentAmount, deadline });

        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

    }

    const removeGaol = async ({ id }) => {
        setLoading(true);
        setError(null);
        try {
            await deleteGoal({ id });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

    }

    const addAmountGaol = async ({ id ,amount}) => {
        setLoading(true);
        setError(null);
        try {
            await addAmountToGoal({ id,amount });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

    }


    const addUpdatedGaol = async ({id,updatedGoal}) => {
        setLoading(true);
        setError(null);
        try {
            await updateGoal({id,updatedGoal});
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

    }

    return { goals, error, loading, fetchGoals, addGoal, removeGaol,addAmountGaol,addUpdatedGaol };
}