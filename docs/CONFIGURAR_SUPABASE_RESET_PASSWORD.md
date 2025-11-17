# Configurar Reset de Senha no Supabase

Para que o fluxo de reset de senha funcione corretamente, você precisa configurar as URLs de redirecionamento no Supabase Dashboard.

## Passo a Passo

### 1. Acesse o Supabase Dashboard

1. Vá para https://supabase.com/dashboard
2. Selecione seu projeto VisaFlow

### 2. Configure Site URL

1. No menu lateral, vá em **Settings** (Configurações)
2. Clique em **Authentication**
3. Na seção **General settings**, encontre **Site URL**
4. Configure para sua URL de produção:

**Produção**:
```
https://visaflow-35frp3uw7-iamrafaelraio-4728s-projects.vercel.app
```

OU se tiver domínio custom:
```
https://seudominio.com
```

### 3. Configure Redirect URLs

Na mesma página (**Authentication** → **URL Configuration**):

1. Encontre **Redirect URLs**
2. Adicione as seguintes URLs (uma por linha):

**Para Produção**:
```
https://visaflow-35frp3uw7-iamrafaelraio-4728s-projects.vercel.app/auth/update-password
https://visaflow-35frp3uw7-iamrafaelraio-4728s-projects.vercel.app/auth/callback
```

**Para Desenvolvimento Local** (opcional):
```
http://localhost:3000/auth/update-password
http://localhost:3000/auth/callback
```

### 4. Configure Email Templates (Opcional mas Recomendado)

1. No menu lateral, vá em **Authentication** → **Email Templates**
2. Encontre **Reset Password**
3. Personalize o template (opcional):

```html
<h2>Redefinir Senha - VisaFlow</h2>
<p>Olá,</p>
<p>Você solicitou a redefinição de senha da sua conta VisaFlow.</p>
<p>Clique no link abaixo para criar uma nova senha:</p>
<p><a href="{{ .ConfirmationURL }}">Redefinir Minha Senha</a></p>
<p>Se você não solicitou esta alteração, pode ignorar este email.</p>
<p>Este link expira em 1 hora.</p>
<p>Equipe VisaFlow</p>
```

### 5. Salve as Alterações

Clique em **Save** para aplicar todas as configurações.

## Testar o Fluxo

### Passo 1: Solicitar Reset
1. Vá para https://seu-site.com/auth/reset-password
2. Digite seu email
3. Clique em "Enviar Email de Redefinição"

### Passo 2: Verificar Email
1. Abra sua caixa de entrada
2. Procure o email do Supabase
3. Clique no link de redefinição

### Passo 3: Redefinir Senha
1. Você será redirecionado para /auth/update-password
2. Digite sua nova senha (mínimo 6 caracteres)
3. Confirme a senha
4. Clique em "Atualizar Senha"

### Passo 4: Login
1. Você será redirecionado para /auth/login
2. Faça login com a nova senha

## Troubleshooting

### Email não chega
- Verifique pasta de spam
- Confirme que o email está correto no Supabase
- Verifique os logs em Authentication → Logs

### Link redireciona para localhost
- Confirme que a **Site URL** está configurada corretamente
- Adicione a URL de produção nas **Redirect URLs**
- Limpe o cache do navegador

### Erro "Invalid redirect URL"
- Certifique-se que a URL está na lista de Redirect URLs
- URLs devem incluir o protocolo (https://)
- Não inclua trailing slashes

## URLs do Sistema

### Páginas de Autenticação
- Login: `/auth/login`
- Signup: `/auth/signup`
- Reset Password (solicitar): `/auth/reset-password`
- Update Password (definir nova): `/auth/update-password`

### Fluxo Completo
```
/auth/login
    ↓ (clica "Forgot password?")
/auth/reset-password
    ↓ (envia email)
📧 Email do Supabase
    ↓ (clica no link)
/auth/update-password
    ↓ (define nova senha)
/auth/login
```

## Segurança

✅ **Implementado**:
- Tokens de reset expiram em 1 hora
- Senhas são criptografadas (bcrypt)
- Validação de força de senha no frontend
- Confirmação de senha obrigatória
- Rate limiting do Supabase (max 4 emails/hora)

✅ **Boas Práticas**:
- Nunca exiba se o email existe ou não (segurança)
- Sempre mostre "email enviado" mesmo se não existir
- Links de reset são de uso único
- Redirecionamento automático após sucesso

