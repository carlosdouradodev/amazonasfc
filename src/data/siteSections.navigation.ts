const clubMenuItems = [
  { label:"Hist\u00f3ria", path:"/clube/historia", aliases: ["/historia"] },
  { label:"S\u00edmbolos", path:"/clube/simbolos" },
  { label:"T\u00edtulos", path:"/clube/titulos" },
  { label:"Curiosidades", path:"/clube/curiosidades" },
];

const footballMenuItems = [
  { label:"Profissional", path:"/futebol/profissional" },
  { label:"Base", path:"/futebol/base" },
];

export const institutionalNavItems = [
  { label:"Estatuto", path:"/institucional/estatuto" },
  { label:"Transpar\u00eancia", path:"/institucional/transparencia" },
  { label:"Comercial", path:"/institucional/comercial" },
  { label:"Imprensa", path:"/institucional/imprensa" },
];

export const primaryNavItems = [
  { label:"In\u00edcio", path:"/" },
  { label:"Clube", path:"/clube/historia", children: clubMenuItems },
  { label:"Futebol", path:"/futebol/profissional", children: footballMenuItems },
  { label:"Not\u00edcias", path:"/noticias" },
  { label:"Elenco", path:"/elenco" },
  { label:"S\u00f3cio", path:"/socio" },
  { label:"Loja", path:"/loja" },
];

export const footerNavGroups = [
  {
    title:"Navega\u00e7\u00e3o",
    items: [
      { label:"In\u00edcio", path:"/" },
      { label:"Matchday", path:"/matchday" },
      { label:"Not\u00edcias", path:"/noticias" },
      { label:"Elenco", path:"/elenco" },
      { label:"S\u00f3cio", path:"/socio" },
      { label:"Loja", path:"/loja" },
    ],
  },
  {
    title:"Clube",
    items: clubMenuItems,
  },
  {
    title:"Futebol",
    items: footballMenuItems,
  },
  {
    title:"Institucional",
    items: institutionalNavItems,
  },
];
