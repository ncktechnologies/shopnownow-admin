"use strict";(self.webpackChunkxpro=self.webpackChunkxpro||[]).push([[276],{68276:function(e,t,n){n.r(t),n.d(t,{default:function(){return x}});var a=n(29439),i=n(72791),r=n(13085),d=n(39609),l=n(59434),s=n(87309),o=n(7262),c=n(72426),u=n.n(c),m=n(80184),p=function(e){var t=e.data,n=e.loading,a=e.setSingleData,i=(e.setUpdate,e.handleVisible),r=e.handleDelete,d=e.deleteLoading,l=[{title:"Ref. Id",dataIndex:"name",width:300,key:"name"},{title:"Amount",dataIndex:"description",key:"description",render:function(e){return e||"Null"}},{title:"Status",dataIndex:"description",key:"description",render:function(e){return e||"Null"}},{title:"Date Created",dataIndex:"created_at",key:"created_at",width:150,render:function(e){return(0,m.jsxs)("span",{style:{whiteSpace:"nowrap"},children:[" ",u()(e).format("DD MMM YYYY")]})}},{title:"",key:"description",width:200,render:function(e){return(0,m.jsxs)("div",{style:{display:"flex",gap:".5rem"},children:[(0,m.jsx)(s.Z,{danger:!0,loading:d,onClick:function(){r(e)},children:"Delete"}),(0,m.jsx)(s.Z,{onClick:function(){a(e),i(!0)},children:"Edit"})]})}}];return(0,m.jsx)("div",{children:(0,m.jsx)(o.Z,{columns:l,loading:n,pagination:t.length>10,dataSource:t,rowKey:"id",scroll:{x:"max-content"}})})},h=n(1413),y=n(97071),f=n(70478),g=n(64910),v=n(29469),Z=function(e){var t=e.visibility,n=e.handleVisible,d=e.update,s=e.singleData,o=(0,i.useState)(!1),c=(0,a.Z)(o,2),u=c[0],p=c[1],Z=(0,l.I0)(),x=y.Z.useForm(),j=(0,a.Z)(x,1)[0];return(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(f.Z,{title:"".concat(d?"Update":"Create"," Payment Method"),visible:t,onOk:function(){p(!0),j.validateFields().then((function(e){p(!1),j.submit()})).catch((function(e){p(!1)}))},confirmLoading:u,onCancel:function(){return n(!1)},okText:"".concat(d?"Update":"Create"," Payment Method"),children:(0,m.jsxs)(y.Z,{name:"Payment Method",layout:"vertical",onFinish:function(e){p(!0),d?Z((0,v.de)((0,h.Z)((0,h.Z)({},e),{},{payment_method_id:null===s||void 0===s?void 0:s.id}))).then((function(e){if(p(!1),"paymentMethod/edit/fulfilled"===e.type)Z((0,v.zi)()),n(),r.Z.success({message:"Payment method updated successfully"});else if("paymentMethod/edit/rejected"===e.type){var t;n(),r.Z.error({message:(null===e||void 0===e||null===(t=e.payload)||void 0===t?void 0:t.message)||"Error updating payment method, please try again"})}})).catch((function(e){p(!1),r.Z.error({message:"Error updating payment method, please try again later"})})):Z((0,v.Iw)(e)).then((function(e){if(p(!1),"paymentMethod/create/fulfilled"===e.type)Z((0,v.zi)()),n(),r.Z.success({message:" Payment method created successfully"});else if("paymentMethod/create/rejected"===e.type){var t;n(),r.Z.error({message:(null===e||void 0===e||null===(t=e.payload)||void 0===t?void 0:t.message)||"Error creating payment method, please try again"})}})).catch((function(e){p(!1),r.Z.error({message:"Error creating payment method, please try again later"})}))},requiredMark:"optional",form:j,initialValues:s,children:[(0,m.jsx)(y.Z.Item,{name:"name",placeholder:"Name",label:"Payment Method Name",rules:[{required:!0,message:"Payment method name is required"}],children:(0,m.jsx)(g.Z,{size:"large",placeholder:"Payment method name"})}),(0,m.jsx)(y.Z.Item,{name:"description",placeholder:"Description",label:"Description",rules:[{required:!0,message:"Description is required"}],children:(0,m.jsx)(g.Z,{size:"large",placeholder:"Description"})})]})})})},x=function(){var e=(0,l.v9)((function(e){return e})).paymentMethods,t=(0,l.I0)(),n=(0,i.useState)(!1),s=(0,a.Z)(n,2),o=s[0],c=s[1],u=(0,i.useState)(!1),h=(0,a.Z)(u,2),y=h[0],f=h[1],g=(0,i.useState)(1),x=(0,a.Z)(g,2),j=x[0],M=x[1],k=(0,i.useState)({}),D=(0,a.Z)(k,2),b=D[0],S=D[1],I=(0,i.useState)(!1),P=(0,a.Z)(I,2),w=P[0],E=P[1];return(0,i.useEffect)((function(){M(j+1),!1===o&&(S({}),f(!1))}),[o]),(0,i.useEffect)((function(){t((0,v.zi)())}),[]),(0,m.jsxs)("div",{children:[(0,m.jsx)(d.Z,{extra:[],title:"Payment Methods"}),(0,m.jsx)(p,{parent:"payment-method",data:null===e||void 0===e?void 0:e.data,loading:null===e||void 0===e?void 0:e.loading,setSingleData:function(e){S(e),f(!0)},handleVisible:c,handleDelete:function(e){var n=e.id;t((0,v.gp)(n)).then((function(e){if(E(!1),"paymentMethod/delete/fulfilled"===e.type)t((0,v.zi)()),r.Z.success({message:" Payment method deleted successfully"});else if("paymentMethod/delete/rejected"===e.type){var n;r.Z.error({message:(null===e||void 0===e||null===(n=e.payload)||void 0===n?void 0:n.message)||"Error deleting payment method, please try again"})}})).catch((function(e){E(!1),r.Z.error({message:"Error deleting payment method, please try again later"})}))},deleteLoading:w}),(0,m.jsx)(Z,{visibility:o,handleVisible:c,update:y,singleData:b},j)]})}}}]);
//# sourceMappingURL=276.392a1609.chunk.js.map