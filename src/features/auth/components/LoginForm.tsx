import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiMailLine, RiLockLine } from 'react-icons/ri';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema';
import { useLogin, extractErrorMessage } from '../hooks/useAuth';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export function LoginForm() {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => login(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        id="login-email"
        type="email"
        label="Correo electrónico"
        placeholder="tu@email.com"
        leftIcon={<RiMailLine className="w-4 h-4" />}
        error={errors.email?.message}
        autoComplete="email"
        {...register('email')}
      />

      <Input
        id="login-password"
        type="password"
        label="Contraseña"
        placeholder="••••••••"
        leftIcon={<RiLockLine className="w-4 h-4" />}
        error={errors.password?.message}
        autoComplete="current-password"
        {...register('password')}
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
        id="login-submit"
      >
        Iniciar sesión
      </Button>
    </form>
  );
}
