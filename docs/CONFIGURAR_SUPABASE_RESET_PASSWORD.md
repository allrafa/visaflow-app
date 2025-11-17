# ⚙️ Configurar Reset de Senha no Supabase

## 🎯 Configuração Rápida (3 passos)

### Passo 1: Site URL

1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto VisaFlow
3. Menu: **Settings** → **Authentication**
4. Na seção **Site URL**, cole:

```
https://visaflow-cgjksqw1m-iamrafaelraio-4728s-projects.vercel.app
```

### Passo 2: Redirect URLs

Na mesma página, seção **Redirect URLs**, adicione:

```
https://visaflow-cgjksqw1m-iamrafaelraio-4728s-projects.vercel.app/auth/callback
```

**IMPORTANTE**: Use APENAS esta URL. O sistema vai redirecionar automaticamente para `/auth/update-password`.

### Passo 3: Salvar

Clique em **Save** no topo da página.

---

## ✅ Pronto!

Agora o fluxo de reset funcionará assim:

```
1. Usuário clica em "Forgot password?" no login
   ↓
2. Digite email em /auth/reset-password
   ↓
3. Supabase envia email
   ↓
4. Usuário clica no link do email
   ↓
5. Redirect para /auth/callback (captura token)
   ↓
6. Redirect automático para /auth/update-password
   ↓
7. Usuário define nova senha
   ↓
8. Redirect para /auth/login
   ↓
9. Login com nova senha!
```

---

## 🧪 Testar o Fluxo

### 1. Solicitar Reset
- Vá para: https://visaflow-cgjksqw1m-iamrafaelraio-4728s-projects.vercel.app/auth/login
- Clique em "Forgot password?"
- Digite: iamrafaelraio@gmail.com
- Clique em "Enviar Email de Redefinição"

### 2. Verificar Email
- Abra sua caixa de entrada
- Procure email do Supabase (pode demorar 1-2 min)
- Verifique spam se não receber

### 3. Clicar no Link
- Clique no botão roxo "Redefinir Minha Senha"
- Você será redirecionado para o VisaFlow (NÃO localhost!)
- A página /auth/update-password deve abrir

### 4. Definir Nova Senha
- Digite uma senha forte (8+ caracteres)
- Veja o indicador de força mudar de cor
- Confirme a senha
- Clique em "Atualizar Senha"

### 5. Login
- Você será redirecionado para /auth/login
- Faça login com a nova senha
- Sucesso! 🎉

---

## 🐛 Troubleshooting

### Problema: Email não chega
**Soluções:**
- Verifique pasta de spam
- Aguarde até 5 minutos
- Tente reenviar
- Confirme que o email está cadastrado no sistema

### Problema: Link redireciona para localhost
**Causa:** Site URL não configurada corretamente no Supabase

**Solução:**
1. Vá em Settings → Authentication
2. Verifique se Site URL é a URL de produção (não localhost)
3. Salve e tente novamente

### Problema: "Invalid redirect URL"
**Causa:** URL não está na lista de Redirect URLs

**Solução:**
1. Certifique-se que adicionou: `/auth/callback`
2. URL deve ser completa com `https://`
3. Sem trailing slash no final
4. Salve e aguarde 1 minuto para propagar

### Problema: Página em branco após clicar no link
**Causa:** Token expirado ou já usado

**Solução:**
- Tokens expiram em 1 hora
- Só podem ser usados uma vez
- Solicite novo reset de senha

---

## 🔒 Segurança

✅ **Recursos de Segurança:**
- Tokens de reset expiram em 1 hora
- Links são de uso único
- Senhas hasheadas com bcrypt
- HTTPS obrigatório em produção
- Rate limiting: máx 4 emails/hora por usuário
- Validação de força de senha no frontend

✅ **Boas Práticas:**
- Sistema NÃO revela se o email existe
- Sempre mostra "email enviado" (anti-enumeração)
- Mensagens claras de segurança
- Avisos sobre phishing

---

## 📧 Personalizar Template de Email (Opcional)

1. No Supabase Dashboard: **Authentication** → **Email Templates**
2. Selecione **"Reset Password"**
3. Use o template do arquivo: `docs/EMAIL_TEMPLATE_RESET_PASSWORD.md`
4. Copie e cole o HTML completo
5. Clique em **Save**

O template personalizado tem:
- Design roxo do VisaFlow
- Logo VF
- Botão CTA destacado
- Avisos de segurança
- Dicas de senha forte
- Footer profissional

---

## 🌐 URLs do Sistema

### Páginas de Autenticação
- **Login**: `/auth/login`
- **Signup**: `/auth/signup`
- **Reset Password** (solicitar): `/auth/reset-password`
- **Callback** (intermediária): `/auth/callback`
- **Update Password** (definir nova): `/auth/update-password`

### Fluxo Técnico
```
Email Link → /auth/callback?code=xxx&next=/auth/update-password
              ↓
         Exchange code for session
              ↓
         /auth/update-password (com sessão autenticada)
              ↓
         Update password via Supabase
              ↓
         /auth/login
```

---

## 💡 Notas Técnicas

### Por que precisamos de /auth/callback?

O Supabase usa um fluxo PKCE (Proof Key for Code Exchange) para segurança:

1. **Email link** contém um `code` (não a sessão direta)
2. **/auth/callback** troca o `code` por uma `session`
3. Só então o usuário pode atualizar a senha

Sem o callback, o Supabase não consegue autenticar o usuário para permitir a troca de senha.

### Variáveis de Ambiente Necessárias

```env
NEXT_PUBLIC_SUPABASE_URL=sua-url-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

Essas variáveis já devem estar configuradas no Vercel.

---

## ✨ Recursos Implementados

✅ Página de solicitação (/auth/reset-password)
✅ Callback handler (/auth/callback)
✅ Página de atualização (/auth/update-password)
✅ Indicador de força de senha (5 níveis)
✅ Validação em tempo real
✅ Show/hide password
✅ Success screens com feedback
✅ Template de email personalizável
✅ Redirect correto (não vai mais para localhost!)
✅ Design consistente com VisaFlow
✅ Totalmente responsivo

---

## 📞 Precisa de Ajuda?

Se ainda tiver problemas:

1. **Verifique os logs** no Supabase: Authentication → Logs
2. **Console do browser**: Abra DevTools (F12) e veja erros no Console
3. **Network tab**: Verifique se as requests estão indo para as URLs corretas

---

**Última atualização**: Deploy com callback fix
**Status**: ✅ Funcionando corretamente

