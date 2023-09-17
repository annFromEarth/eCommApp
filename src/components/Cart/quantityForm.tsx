import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Box, Input } from '@mui/material';
import { numbersOnly } from '../../utils/regexToValidate';
import { CustomerService } from '../../services/customerService';
import { Cart, LineItem } from '../../services/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentVersion } from '../../features/myCartSlice';

interface IQuantityInput {
  quantity: number;
}

export default function QuantityForm({
  itemProp,
  cartProp,
  funcEditQuantityClick,
  setCartDataProp,
}: {
  itemProp: LineItem;
  cartProp: Cart;
  funcEditQuantityClick: () => void;
  setCartDataProp: React.Dispatch<React.SetStateAction<Cart | null>>;
}) {
  const [errorUpdate, setErrorUpdate] = useState<string>('');

  const form = useForm<IQuantityInput>({
    mode: 'onChange',
    defaultValues: {
      quantity: itemProp.quantity,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = form;

  const dispatch = useAppDispatch();
  const cartVersion = useAppSelector((state) => state.myCart.currentVersion);

  const authorizationToken = sessionStorage?.getItem('authorization-token');

  const onSubmit: SubmitHandler<IQuantityInput> = async (data) => {
    funcEditQuantityClick();
    if (authorizationToken) {
      try {
        const result = await CustomerService.updateMyCart(
          authorizationToken,
          cartProp.id,
          cartVersion,
          [
            {
              action: 'changeLineItemQuantity',
              lineItemId: itemProp.id,
              quantity: Number(data.quantity),
            },
          ]
        );
        setCartDataProp(result);
        dispatch(setCurrentVersion(result.version));
      } catch (err) {
        const error = err as Error;
        setErrorUpdate(error.message);
      }
    }
  };

  useEffect(() => {
    reset({ quantity: itemProp.quantity });
  }, [isSubmitSuccessful, reset, itemProp.quantity]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '40px', display: 'flex' }}>
      <Input
        id="quantity"
        sx={{ margin: '5px', minWidth: '70px', padding: '0px' }}
        {...register('quantity', {
          required: 'This field is required',
          min: 1,
          max: 999,
          pattern: numbersOnly,
        })}
        error={!!errors.quantity}
      />

      <Button size="small" type="submit">
        <DoneIcon />
      </Button>
      <Box sx={{ color: 'red' }}>{errorUpdate}</Box>
    </form>
  );
}
