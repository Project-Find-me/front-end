import * as yup from 'yup';

export default yup.object().shape({
  nome: yup.string().required('O campo nome é necessário'),
  email: yup
    .string()
    .email('O email tem que estar em um formato válido')
    .required('O campo email é necessário'),
  senha: yup
    .string()
    .min(8, 'A senha precisa ter no minimo 8 caracteres')
    .required('O campo senha é necessário'),
  cep: yup.string().required('O campo cep é necessário'),
  cidade: yup.string().required('O campo cidade é necessário'),
  uf: yup.string().required('O campo uf é necessário'),
  bairro: yup.string().required('O campo bairro é necessário'),
  rua: yup.string().required('O campo rua é necessário'),
  numero: yup.string().required('O campo numero é necessário'),
  telefone: yup.number().required(),
  rg: yup.number().required(),
  cnpj: yup.number(),
  cpf: yup.number(),
  nomeTitular: yup.string(),
  numeroCartao: yup.number(),
  validadeCartao: yup.string(),
});
