"use strict";(self.webpackChunkxpro=self.webpackChunkxpro||[]).push([[230],{86230:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var a=n(39609),r=n(72791),i=n(59434),l=n(89994),d=n(1413),s=n(29439),c=n(67734),o=n(87309),u=n(7262),h=n(72426),x=n.n(h),f=n(43504),m=n(29529),p=n(10568),y=n(80184),_=function(e){var t=e.data,n=e.loading,a=(0,r.useState)(""),i=(0,s.Z)(a,2),l=i[0],h=i[1],_=(0,r.useState)(""),g=(0,s.Z)(_,2),j=g[0],v=g[1],k=(0,r.useRef)(null),I=function(e,t,n){t(),h(e[0]),v(n)},w=function(e){e(),h("")},C=[{title:"Image",key:"client",align:"center",render:function(e){return(0,y.jsx)("div",{children:null!==e&&void 0!==e&&e.profile_photo_url?(0,y.jsx)("img",{style:{width:"60px",height:"60px",borderRadius:"50%",objectFit:"cover"},src:null===e||void 0===e?void 0:e.profile_photo_url,height:60,width:60,alt:"avatar"}):(0,y.jsx)(c.C,{style:{backgroundColor:"#3f8bcaa1"},icon:(0,y.jsx)(m.Z,{}),size:50})})}},(0,d.Z)({title:"First Name",dataIndex:"first_name",key:"first_name"},(0,p.X)({dataIndex:"first_name",handleReset:w,searchInput:k,handleSearch:I,setSearchedColumn:v,searchText:l,setSearchText:h,searchedColumn:j})),(0,d.Z)({title:"Last Name",dataIndex:"last_name",key:"last_name"},(0,p.X)({dataIndex:"last_name",handleReset:w,searchInput:k,handleSearch:I,setSearchedColumn:v,searchText:l,setSearchText:h,searchedColumn:j})),{title:"Email",dataIndex:"email",key:"email",render:function(e){return(0,y.jsx)("a",{style:{color:"blue",textDecoration:"none"},href:"mailto:".concat(e),children:e})}},{title:"Phone",dataIndex:"phone_number",key:"phone_number",render:function(e){return e?(0,y.jsx)("a",{style:{color:"blue",textDecoration:"none"},href:"tel:".concat(e),children:e}):"Null"}},{title:"Address",dataIndex:"address",key:"address",render:function(e){return e||"Null"}},{title:"Client Type",dataIndex:"user_type",key:"user_type"},{title:"Stars",dataIndex:"star_rating_count",key:"star_rating_count",render:function(e){return e||"Null"}},{title:"Date Created",dataIndex:"created_at",key:"created_at",render:function(e){return(0,y.jsxs)("span",{style:{whiteSpace:"nowrap"},children:[" ",x()(e).format("DD MMM YYYY")]})}},{title:"",key:"view",width:200,align:"center",render:function(e){return(0,y.jsx)("div",{children:(0,y.jsx)(o.Z,{style:{marginRight:"5px"},title:"View client details",children:(0,y.jsx)(f.rU,{to:"/clients/".concat(null===e||void 0===e?void 0:e.id),children:"View"})})})}}];return(0,y.jsx)("div",{children:(0,y.jsx)(u.Z,{columns:C,loading:n,pagination:t.length>10,dataSource:t,rowKey:"id",scroll:{x:"max-content"}})})},g=function(){var e=(0,i.I0)(),t=(0,i.v9)((function(e){return e})).clients;return(0,r.useEffect)((function(){e((0,l.Ac)())}),[]),(0,y.jsxs)("div",{children:[(0,y.jsx)(a.Z,{title:"Clients"}),(0,y.jsx)(_,{data:t.data,loading:t.loading})]})}}}]);
//# sourceMappingURL=230.cdb932aa.chunk.js.map