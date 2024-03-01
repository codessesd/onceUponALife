import{T as j,d as f,o as d,c as P,w as s,g as r,e as x,a as l,b as o,l as p,K as v,a0 as B,i as h,f as _,u as t,j as E,n as A,_ as F}from"./app-BuQGMQ54.js";import{_ as R}from"./ActionMessage-Bhvu5BCf.js";import{_ as T}from"./FormSection-CD__dufA.js";import{a as g,_ as S}from"./TextInput-qC2p5mR_.js";import{_ as k}from"./InputLabel-B2Cvz5jz.js";import{_ as q}from"./PrimaryButton-DtlDwvR2.js";import{_ as V}from"./SecondaryButton-QBr-V6y6.js";import"./SectionTitle-Chs5W_Le.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const z={key:0,class:"col-span-6 sm:col-span-4"},D={class:"mt-2"},L=["src","alt"],O={class:"mt-2"},K={class:"col-span-6 sm:col-span-4"},M={class:"col-span-6 sm:col-span-4"},Y={key:0},G={class:"text-sm mt-2 dark:text-white"},H={class:"mt-2 font-medium text-sm text-green-600 dark:text-green-400"},se={__name:"UpdateProfileInformationForm",props:{user:Object},setup(u){const y=u,e=j({_method:"PUT",name:y.user.name,email:y.user.email,photo:null}),b=f(null),c=f(null),n=f(null),$=()=>{n.value&&(e.photo=n.value.files[0]),e.post(route("user-profile-information.update"),{errorBag:"updateProfileInformation",preserveScroll:!0,onSuccess:()=>w()})},C=()=>{b.value=!0},I=()=>{n.value.click()},N=()=>{const a=n.value.files[0];if(!a)return;const i=new FileReader;i.onload=m=>{c.value=m.target.result},i.readAsDataURL(a)},U=()=>{F.delete(route("current-user-photo.destroy"),{preserveScroll:!0,onSuccess:()=>{c.value=null,w()}})},w=()=>{var a;(a=n.value)!=null&&a.value&&(n.value.value=null)};return(a,i)=>(d(),P(T,{onSubmitted:$},{title:s(()=>[r(" Profile Information ")]),description:s(()=>[r(" Update your account's profile information and email address. ")]),form:s(()=>[a.$page.props.jetstream.managesProfilePhotos?(d(),x("div",z,[l("input",{id:"photo",ref_key:"photoInput",ref:n,type:"file",class:"hidden",onChange:N},null,544),o(k,{for:"photo",value:"Photo"}),p(l("div",D,[l("img",{src:u.user.profile_photo_url,alt:u.user.name,class:"rounded-full h-20 w-20 object-cover"},null,8,L)],512),[[v,!c.value]]),p(l("div",O,[l("span",{class:"block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center",style:B("background-image: url('"+c.value+"');")},null,4)],512),[[v,c.value]]),o(V,{class:"mt-2 me-2",type:"button",onClick:h(I,["prevent"])},{default:s(()=>[r(" Select A New Photo ")]),_:1}),u.user.profile_photo_path?(d(),P(V,{key:0,type:"button",class:"mt-2",onClick:h(U,["prevent"])},{default:s(()=>[r(" Remove Photo ")]),_:1})):_("",!0),o(g,{message:t(e).errors.photo,class:"mt-2"},null,8,["message"])])):_("",!0),l("div",K,[o(k,{for:"name",value:"Name"}),o(S,{id:"name",modelValue:t(e).name,"onUpdate:modelValue":i[0]||(i[0]=m=>t(e).name=m),type:"text",class:"mt-1 block w-full",required:"",autocomplete:"name"},null,8,["modelValue"]),o(g,{message:t(e).errors.name,class:"mt-2"},null,8,["message"])]),l("div",M,[o(k,{for:"email",value:"Email"}),o(S,{id:"email",modelValue:t(e).email,"onUpdate:modelValue":i[1]||(i[1]=m=>t(e).email=m),type:"email",class:"mt-1 block w-full",required:"",autocomplete:"username"},null,8,["modelValue"]),o(g,{message:t(e).errors.email,class:"mt-2"},null,8,["message"]),a.$page.props.jetstream.hasEmailVerification&&u.user.email_verified_at===null?(d(),x("div",Y,[l("p",G,[r(" Your email address is unverified. "),o(t(E),{href:a.route("verification.send"),method:"post",as:"button",class:"underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",onClick:h(C,["prevent"])},{default:s(()=>[r(" Click here to re-send the verification email. ")]),_:1},8,["href"])]),p(l("div",H," A new verification link has been sent to your email address. ",512),[[v,b.value]])])):_("",!0)])]),actions:s(()=>[o(R,{on:t(e).recentlySuccessful,class:"me-3"},{default:s(()=>[r(" Saved. ")]),_:1},8,["on"]),o(q,{class:A({"opacity-25":t(e).processing}),disabled:t(e).processing},{default:s(()=>[r(" Save ")]),_:1},8,["class","disabled"])]),_:1}))}};export{se as default};
