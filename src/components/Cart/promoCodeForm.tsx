import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Input } from '@mui/material';
import { CustomerService } from '../../services/customerService';
import { Cart } from '../../services/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentVersion } from '../../features/myCartSlice';

interface IPromoCodeInput {
  promoCode: string;
}

export default function PromoCodeForm({
  cartProp,
  setCartDataProp,
}: {
  cartProp: Cart;
  setCartDataProp: React.Dispatch<React.SetStateAction<Cart | null>>;
}) {
  const form = useForm<IPromoCodeInput>({
    mode: 'onChange',
    defaultValues: {
      promoCode: '',
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

  const onSubmit: SubmitHandler<IPromoCodeInput> = async (data) => {
    if (authorizationToken) {
      try {
        const result = await CustomerService.updateMyCart(
          authorizationToken,
          cartProp.id,
          cartVersion,
          [
            {
              action: 'addDiscountCode',
              code: data.promoCode,
            },
          ]
        );

        if (result.message) {
          return result.message;
        } else {
          setCartDataProp(result);
          dispatch(setCurrentVersion(result.version));
        }
      } catch (err) {} //TODO: do smth
    }
  };

  useEffect(() => {
    reset({ promoCode: '' });
  }, [isSubmitSuccessful, reset]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '40px', display: 'flex' }}>
      <Input
        id="promoCode"
        sx={{
          margin: '5px',
          minWidth: '150px',
          padding: '0px',
          background: 'white',
          borderRadius: '5px',
        }}
        {...register('promoCode')}
        error={!!errors.promoCode}
      />

      <Button size="small" type="submit">
        <DoneIcon />
      </Button>
    </form>
  );
}
