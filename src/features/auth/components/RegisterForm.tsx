import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiMailLine, RiLockLine } from 'react-icons/ri';
import { registerSchema, type RegisterFormData } from '../schemas/auth.schema';
import { useRegister, extractErrorMessage } from '../hooks/useAuth';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export function RegisterForm() {
  const { mutate: registerUser, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser({ email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        id="register-email"
        type="email"
        label="Correo electrónico"
        placeholder="tu@email.com"
        leftIcon={<RiMailLine className="w-4 h-4" />}
        error={errors.email?.message}
        autoComplete="email"
        {...register('email')}
      />

      <Input
        id="register-password"
        type="password"
        label="Contraseña"
        placeholder="Mínimo 6 caracteres"
        leftIcon={<RiLockLine className="w-4 h-4" />}
        error={errors.password?.message}
        autoComplete="new-password"
        hint="La contraseña debe tener al menos 6 caracteres"
        {...register('password')}
      />

      <Input
        id="register-confirm-password"
        type="password"
        label="Confirmar contraseña"
        placeholder="Repite tu contraseña"
        leftIcon={<RiLockLine className="w-4 h-4" />}
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
        {...register('confirmPassword')}
      />

      {error && (
        <div role="alert" className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-sm text-red-400">
          {extractErrorMessage(error)}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isPending}
        className="w-full"
        id="register-submit"
      >
        Crear cuenta
      </Button>
    </form>
  );
}
