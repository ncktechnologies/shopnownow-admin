"use strict";(self.webpackChunkxpro=self.webpackChunkxpro||[]).push([[845],{65845:function(e,n,r){r.r(n),r.d(n,{default:function(){return A}});var s,a,i=r(39609),t=r(72791),l=r(59434),o=r(8977),d=r(30168),c=r(13085),u=r(20319),p=r(87309),m=r(67734),f=r(14222),h=r(35614),x=r(16871),g=r(39126),v=r(16444),j=r(80184),Z=function(){var e=(0,l.I0)(),n=(0,x.s0)(),r=(0,l.v9)((function(e){return e.profile})),s=r.singleData,a=r.loading,i=(0,t.useRef)(),d=new FormData;console.log(s);return(0,j.jsx)(y,{children:(0,j.jsx)("div",{children:(0,j.jsx)("div",{className:"userInfo",children:(0,j.jsxs)(u.Z,{loading:a,className:"userInfo__card",children:[(0,j.jsx)("div",{className:" flex, justify-end",onClick:function(){return n(-1)},children:(0,j.jsx)("div",{to:"#",className:"userInfo__back",children:(0,j.jsx)(p.Z,{icon:(0,j.jsx)(g.And,{}),type:"link",className:"hover:text-blue-100 flex gap-1 items-center hover:gap-2 ease-in-out duration-300",style:{color:"#FF0303"},children:"Back"})})}),(0,j.jsx)(h.Z,{avatar:(0,j.jsxs)("div",{onClick:function(){return i.current.click()},className:"avatar_overlay",children:[(0,j.jsx)("input",{onChange:function(n){return function(n){var r;d.append("profile_picture",null===n||void 0===n||null===(r=n.target)||void 0===r?void 0:r.files[0]),e((0,o.yc)(d)).then((function(e){"profile/editPicture/fulfilled"===(null===e||void 0===e?void 0:e.type)?c.Z.success({message:"Profile picture updated successfully"}):(console.log(e),c.Z.error({message:"Error updating profile image, please try again later"}))}))}(n)},name:"profile_picture",ref:i,accept:"image/png, image/gif, image/jpeg",type:"file"}),(0,j.jsx)(m.C,{size:100,src:(null===s||void 0===s?void 0:s.profile_photo_url)||"https://joeschmoe.io/api/v1/random"})]}),title:(0,j.jsx)(f.Z.Title,{level:2,className:"text-3xl m-0 w-full",children:" ".concat((null===s||void 0===s?void 0:s.full_name)||"")}),description:(0,j.jsxs)("div",{className:"metaDescription",children:[(null===s||void 0===s?void 0:s.phone_number)&&(0,j.jsx)("div",{className:"flex align-middle items-center gap-3 flex-wrap",children:(0,j.jsxs)("a",{className:"text-sm",href:"tel:".concat(null===s||void 0===s?void 0:s.phone_number),children:[(0,j.jsx)(g.me1,{size:15})," ",(null===s||void 0===s?void 0:s.phone_number)||"no phone"]})}),(0,j.jsx)("div",{className:"flex align-middle items-center gap-3 flex-wrap ",children:(0,j.jsxs)("a",{href:"mailto:".concat(null===s||void 0===s?void 0:s.email),className:"text-sm",children:[(0,j.jsx)(g.lZw,{size:15})," ",(null===s||void 0===s?void 0:s.email)||""]})})]})})]})})})})},y=v.ZP.div(s||(s=(0,d.Z)(["\n  .ant-card-meta {\n    align-items: center !important;\n  }\n\n  .metaDescription {\n    a {\n      display: flex;\n      align-items: center;\n      gap: 0.3rem;\n      color: #FF0303\n    }\n  }\n\n  .avatar_overlay {\n    position: relative;\n\n    input[type='file'] {\n      display: none;\n    }\n\n    &:hover::after {\n      transition: all 0.5s;\n      opacity: 0.6;\n    }\n\n    &:hover::before {\n      transition: all 0.2s;\n      opacity: 1;\n    }\n\n    &::after {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      width: 100%;\n      background-color: black;\n      border-radius: 100%;\n      opacity: 0;\n      cursor: pointer;\n    }\n\n    &::before {\n      content: 'Edit';\n      z-index: 2;\n      color: white;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, 10%);\n      border: 1px solid white;\n      padding: 0.05rem 1rem;\n      border-radius: 20px;\n      font-size: 12px;\n      cursor: pointer;\n      opacity: 0;\n    }\n  }\n\n  .userInfo {\n    &__back {\n      display: flex;\n      justify-content: flex-end;\n      button {\n        display: flex;\n        gap: 0.2rem;\n        align-items: center;\n        transition: all 0.3s;\n      }\n      button :hover {\n        gap: 0.5rem;\n      }\n    }\n  }\n\n  .infoTab {\n    margin-top: 1rem;\n    padding: 0 0.5rem;\n  }\n"]))),w=r(1413),b=r(12173),P=r(74165),_=r(15861),F=r(29439),N=r(97071),k=r(66106),I=r(30914),z=r(83099),C=r(64910),D=r(23606),T=function(){var e=(0,l.I0)(),n=(0,t.useState)(null),r=(0,F.Z)(n,2),s=r[0],a=r[1],i=(0,t.useState)(!1),o=(0,F.Z)(i,2),d=o[0],u=o[1],m=N.Z.useForm(),h=(0,F.Z)(m,1)[0],x=function(){var n=(0,_.Z)((0,P.Z)().mark((function n(r){return(0,P.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:u(!0),e((0,D.Cp)(r)).then((function(e){var n,r;("auth/changePassword/fulfilled"===e.type&&(u(!1),c.Z.success({message:"Password successfully changed"}),h.resetFields()),"auth/changePassword/rejected"===e.type)&&(u(!1),a({message:null===e||void 0===e||null===(n=e.payload)||void 0===n?void 0:n.message,errors:null===e||void 0===e||null===(r=e.payload)||void 0===r?void 0:r.errors}))}));case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,j.jsx)(k.Z,{children:(0,j.jsx)(I.Z,{sm:24,md:12,lg:9,children:(0,j.jsxs)(N.Z,{form:h,onValuesChange:function(){return a(null)},onFinish:x,layout:"vertical",children:[(0,j.jsxs)(z.Z,{size:"middle",direction:"vertical",children:[s&&(0,j.jsx)(f.Z.Text,{type:"danger",children:s.message}),(0,j.jsx)("span",{})]}),(0,j.jsx)(N.Z.Item,{label:"Current Password",name:"old_password",rules:[{type:"password",required:!0,message:"Please enter your current password!"},function(e){var n=e.getFieldValue;return{validator:function(e,r){return r&&""===n("old_password")?Promise.reject(new Error("Please enter your current password!")):Promise.resolve()}}}],children:(0,j.jsx)(C.Z,{placeholder:"current password",size:"large",type:"password"})}),(0,j.jsx)(N.Z.Item,{label:"New Password",name:"password",rules:[{required:!0,message:"Please input your new password!",type:"password"}],children:(0,j.jsx)(C.Z,{size:"large",type:"password",placeholder:"new password"})}),(0,j.jsx)(N.Z.Item,{label:"Confirm New Password",name:"password_confirmation",rules:[{required:!0,message:"Please confirm your password!"},function(e){var n=e.getFieldValue;return{validator:function(e,r){return r&&n("password")!==r?Promise.reject(new Error("The two passwords that you entered do not match!")):Promise.resolve()}}}],children:(0,j.jsx)(C.Z,{size:"large",type:"password",placeholder:"new password"})}),(0,j.jsx)(N.Z.Item,{children:(0,j.jsx)(p.Z,{loading:d,className:"btn-reset",htmlType:"submit",style:{color:"white",backgroundColor:"#FF0303"},size:"large",children:d?"Loading...":"Reset Password"})})]})})})},S=function(){var e=(0,l.I0)(),n=(0,t.useState)(null),r=(0,F.Z)(n,2),s=r[0],a=r[1],i=(0,t.useState)(!1),d=(0,F.Z)(i,2),u=d[0],m=d[1],h=N.Z.useForm(),x=(0,F.Z)(h,1)[0],g=((0,l.v9)((function(e){return e.profile})).singleData,function(){var n=(0,_.Z)((0,P.Z)().mark((function n(r){return(0,P.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:m(!0),e((0,o.s2)(r)).then((function(n){var r,s;("profile/editProfile/fulfilled"===n.type&&(m(!1),c.Z.success({message:"Profile updated successfully"}),e((0,o.Ai)()),x.resetFields()),"profile/editProfile/rejected"===n.type)&&(m(!1),a({message:null===n||void 0===n||null===(r=n.payload)||void 0===r?void 0:r.message,errors:null===n||void 0===n||null===(s=n.payload)||void 0===s?void 0:s.errors}))}));case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}());return(0,j.jsx)(k.Z,{children:(0,j.jsx)(I.Z,{sm:24,md:12,lg:9,children:(0,j.jsxs)(N.Z,{form:x,onValuesChange:function(){return a(null)},onFinish:g,layout:"vertical",children:[(0,j.jsxs)(z.Z,{size:"middle",direction:"vertical",children:[s&&(0,j.jsx)(f.Z.Text,{type:"danger",children:s.message}),(0,j.jsx)("span",{})]}),(0,j.jsx)(N.Z.Item,{label:"First Name",name:"first_name",rules:[{required:!0,message:"Please enter your first name"}],children:(0,j.jsx)(C.Z,{placeholder:"First name",size:"large"})}),(0,j.jsx)(N.Z.Item,{label:"Last Name",name:"last_name",rules:[{message:"Please enter your last name"}],children:(0,j.jsx)(C.Z,{placeholder:"Last name",size:"large"})}),(0,j.jsx)(N.Z.Item,{label:"Phone number",name:"phone_number",rules:[{required:!0,message:"Please enter your phone number"},{pattern:"^[0-9]+$",message:"Please enter a valid phone number"}],children:(0,j.jsx)(C.Z,{placeholder:"Last name",size:"large"})}),(0,j.jsx)(N.Z.Item,{children:(0,j.jsx)(p.Z,{loading:u,className:"btn-reset",htmlType:"submit",style:{color:"white",backgroundColor:"#FF0303"},size:"large",children:u?"Loading...":"Submit"})})]})})})},E=b.Z.TabPane,q=function(e){var n=(0,l.v9)((function(e){return e.clients})).singleData;return(0,j.jsx)(L,(0,w.Z)((0,w.Z)({},e),{},{children:(0,j.jsxs)(b.Z,{defaultActiveKey:"1",children:[(0,j.jsx)(E,{tab:"Edit Profile",children:(0,j.jsx)(S,{singleData:n})},"1"),(0,j.jsx)(E,{tab:"Change Password",children:(0,j.jsx)(T,{})},"2"),(0,j.jsx)(E,{tab:"Referral Discount Settings"},"3")]})}))},L=v.ZP.div(a||(a=(0,d.Z)(["\n  margin-top: 1rem;\n  padding: 0 0.5rem;\n"]))),A=function(){var e=(0,l.I0)();return(0,t.useEffect)((function(){e((0,o.Ai)())}),[]),(0,j.jsxs)("div",{children:[(0,j.jsx)(i.Z,{title:"Settings"}),(0,j.jsx)(Z,{}),(0,j.jsx)(q,{})]})}}}]);
//# sourceMappingURL=845.571d63a3.chunk.js.map