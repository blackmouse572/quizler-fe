'use client'
import LoginSchema, { LoginSchemaType } from '@/app/[locale]/(auth)/login/validations/login-validate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

type Props = {}

function LoginForm({ }: Props) {
    const t = useTranslations('SignIn')
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema)
    })

    function onSubmit(values: LoginSchemaType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Card className="min-w-96">
            <CardHeader>
                <CardTitle className="font-heading text-lg">{t('title')}</CardTitle>
                <CardDescription className="text-sm text-neutral-500">
                    {t.rich('descritpion', {
                        forgot: (children) => <Link className="font-medium underline opacity-75 hover:opacity-100" href='/forgot'>{children}</Link>,
                        need: (children) => <Link className="font-medium underline opacity-75 hover:opacity-100" href='/signup'>{children}</Link>
                    })}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name="email" render={({ field }) => {
                            return <div className="space-y-1">
                                <FormLabel required htmlFor="">{t('form.email.label')}</FormLabel>
                                <FormControl>
                                    <Input className="rounded-sm" id="email" placeholder={t('form.email.placeholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </div>
                        }} />

                        <FormField control={form.control} name="password" render={({ field }) => {
                            return <div className="space-y-1">
                                <FormLabel required htmlFor="">{t('form.password.label')}</FormLabel>
                                <FormControl>
                                    <Input className="rounded-sm" id="password" type="password" placeholder={t('form.password.placeholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </div>
                        }} />

                        <FormField control={form.control} name="password" render={({ field }) => {
                            return <div className="flex items-center gap-2 justify-start">
                                <FormControl className=''>
                                    <Checkbox size={'sm'} id="remember" {...field} />
                                </FormControl>
                                <FormLabel className='text-sm' htmlFor="remember">{t('form.remember')}</FormLabel>
                                <FormMessage />
                            </div>
                        }} />

                        <Button className="w-full" color="primary" variant="default" type="submit">
                            {t('form.submit')}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default LoginForm