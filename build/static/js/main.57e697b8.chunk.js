(this.webpackJsonpmarioplan=this.webpackJsonpmarioplan||[]).push([[0],{117:function(e,t,a){"use strict";a.r(t);var n=a(9),r=a(11),c=a(12),i=a(14),l=a(13),o=a(15),s=a(0),u=a.n(s),m=a(10),h=a(313),d=a(118),p=a(123),f=function(e){function t(){var e,a;Object(r.a)(this,t);for(var c=arguments.length,o=new Array(c),s=0;s<c;s++)o[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).state={match_num:0,team_tum:0,cycle_time:[0],climb_time:0,balls_scored:0,outer:0,lower:0,miss:0,pickup:0,max_pickup:0,floor_pickup:!1,station_pickup:!1,defense_time:0,stage2_activate:!1,stage3_activate:!1,trench:!1,preloads:0,shooting_pos:[{x:0,y:0}]},a.handleChange=function(e){isNaN(e.target.value)?a.setState(Object(n.a)({},e.target.id,e.target.value)):a.setState(Object(n.a)({},e.target.id,Number(e.target.value)))},a.handleNext=function(e){e.preventDefault(),console.log(a.state)},a.handleSubmit=function(e){e.preventDefault(),a.props.createMatchForm(a.state),a.props.history.push("/")},a}return Object(o.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return this.props.auth.uid?u.a.createElement("div",null,u.a.createElement(d.default,null)):u.a.createElement(h.a,{to:"/signin"})}}]),t}(s.Component);t.default=Object(m.b)((function(e){return{auth:e.firebase.auth}}),(function(e){return{createMatchForm:function(t){return e(Object(p.a)(t))}}}))(f)},118:function(e,t,a){"use strict";a.r(t);var n,r=a(9),c=a(187),i=a(11),l=a(12),o=a(14),s=a(13),u=a(15),m=a(0),h=a.n(m),d=a(10),p=a(123),f=a(313),E=a(662);a(272);function g(e){return h.a.createElement("div",{className:"counter"},h.a.createElement("button",{className:"counter-action decrement",onClick:function(){e.onChange(e.score>0?-1:0)}}," ","-"," "),h.a.createElement("div",{className:"counter-score"}," ",e.score," "),h.a.createElement("button",{className:"counter-action increment",onClick:function(){e.onChange(1)}}," ","+"," "))}function b(e){return h.a.createElement("div",{className:"shot"},h.a.createElement("div",{className:"shot-score"},h.a.createElement(g,{score:e.score,onChange:e.onScoreChange})))}var v=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(s.a)(t).call(this,e))).state={timer_running:null,timer:[0,0]},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props.this;return h.a.createElement("button",{className:"btn btn-danger",style:{height:"60px"},onClick:function(){if(e.setState({timer:[null===e.state.timer_running?e.state.timer[0]:e.state.timer[0]+(new Date).getTime()-e.state.timer_running,e.state.timer[1]]}),null!==e.state.timer_running){e.setState({timer_running:null}),clearInterval(e.timer);var a=Object(c.a)(t.state.timers);a[e.props.index]=e.state.timer,t.setState({timers:a})}else e.setState({timer_running:(new Date).getTime()}),e.timer=setInterval((function(){var t=(new Date).getTime();e.setState({timer:[e.state.timer[0]+t-e.state.timer_running,e.state.timer[1]],timer_running:t})}),1)}},(null===this.state.timer_running?this.props.displayName:"Stop Timer")+": "+(this.state.timer[0]/1e3).toFixed(3)+"s")}}]),t}(m.Component),y=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(s.a)(t).call(this,e))).state={value:a.props.type!==Boolean&&null},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return h.a.createElement("tr",null,h.a.createElement("th",{style:{width:"30px",paddingTop:"0px",paddingBottom:"0px"}},h.a.createElement("button",{onClick:function(){e.setState({value:!e.state.value}),console.log(!e.state.value),e.props.doClick(Object(r.a)({},e.props.statename,!e.state.value))},style:{border:"1px solid black"}},h.a.createElement("div",{style:{height:"20px",width:"10px"}},this.state.value?"\u2713":null))),h.a.createElement("th",{style:{width:"30px",paddingTop:"0px",paddingBottom:"0px"}},h.a.createElement("div",{style:{height:"11px"}}),h.a.createElement("p",null,this.props.displayName)))}}]),t}(m.Component),N=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(s.a)(t).call(this,e))).onScoreChange=function(e,t){a.state.shots[e].score+=t,(a.state.shots[0].score+a.state.shots[1].score)%5===0&&a.state.cycle_time.push(((new Date).getTime()-n)/1e3),a.setState(a.state)},a.showPreMatch=function(e){e.preventDefault(),a.setState({inMatchView:1}),console.log(a.state)},a.showInMatch=function(e){e.preventDefault(),a.setState({inMatchView:2,preloads:a.state.balls_scored}),n=(new Date).getTime(),console.log(a.state)},a.showEndMatch=function(e){e.preventDefault(),null!==a.state.timer_running&&(a.setState({timer_running:null}),clearInterval(a.timer)),a.setState({inMatchView:3}),console.log(a.state)},a.handleChange=function(e){isNaN(e.target.value)?a.setState(Object(r.a)({},e.target.id,e.target.value)):a.setState(Object(r.a)({},e.target.id,Number(e.target.value))),console.log(a.state)},a.handleNext=function(e){e.preventDefault(),console.log(a.state)},a.handleSubmit=function(e){e.preventDefault(),a.props.createMatchForm(a.state),a.props.history.push("/")},a.togglecircledisplay=function(){a.setState({circle_show:!a.state.circle_show})},a.clicky=function(e){var t=e.clientX,n=e.clientY;if(t=Number(t-document.getElementById("clickyimg").getBoundingClientRect().left).toFixed(0),n=Number(n-document.getElementById("clickyimg").getBoundingClientRect().top).toFixed(0),t>=0&&n>=0&&t<=document.getElementById("clickyimg").getBoundingClientRect().right-document.getElementById("clickyimg").getBoundingClientRect().left&&n<=document.getElementById("clickyimg").getBoundingClientRect().bottom-document.getElementById("clickyimg").getBoundingClientRect().top){var r=Object(c.a)(a.state.shooting_pos);r.push({x:Number(t),y:Number(n),index:a.state.shooting_pos.length}),a.setState({shooting_pos:r}),console.log(a.state)}},a.incrementPreload=function(e){e.preventDefault(),a.state.balls_scored+1>3?a.setState({balls_scored:3}):a.setState({balls_scored:a.state.balls_scored+1})},a.resetPreload=function(e){e.preventDefault(),a.setState({balls_scored:0})},a.state={team_num:0,cycle_time:[],climb_time:0,balls_scored:0,floor_pickup:!1,station_pickup:!1,stage2_activate:!1,stage3_activate:!1,trench:!1,preloads:0,shooting_pos:[],time:0,isOn:!1,start:0,inMatchView:0,circle_size:50,circle_show:!0,timers:[0,0,0,0,0],shots:[{type:"high",score:0,id:1},{type:"low",score:0,id:2},{type:"miss",score:0,id:3}]},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"Circle",value:function(e){var t=this;try{var n=e.shooting_pos.map((function(n){return function(n){return h.a.createElement("img",{key:e.shooting_pos[n].index,src:a(273)("".concat("./circle.png")),width:e.circle_size,height:e.circle_size,onClick:function(){t.clicky(window.event)},style:{position:"absolute",left:e.shooting_pos[n].x+document.getElementById("clickyimg").getBoundingClientRect().left-e.circle_size/2+"px",top:e.shooting_pos[n].y+document.getElementById("clickyimg").getBoundingClientRect().top-e.circle_size/2+"px"}})}(n.index)}));return h.a.createElement(h.a.Fragment,null,n)}catch(r){return null}}},{key:"render",value:function(){var e=this;if(!this.props.auth.uid)return h.a.createElement(f.a,{to:"/signin"});var t=0===this.state.inMatchView?h.a.createElement("form",{className:"white",onSubmit:this.showPreMatch},h.a.createElement("div",{className:"input-field"},h.a.createElement("p",{style:{fontWeight:"bold",fontSize:25}},"Enter the current match number:"),h.a.createElement("input",{type:"number",id:"match_num",onChange:this.handleChange,placeholder:"Match number"})),h.a.createElement("div",{className:"input-field"},h.a.createElement("button",{className:"btn pink lighten-1",id:"button1"},"Next"))):null,n=1===this.state.inMatchView?h.a.createElement("form",{className:"white",onSubmit:this.showInMatch},h.a.createElement("div",{className:"input-field"},h.a.createElement("p",{style:{fontWeight:"bold",fontSize:25}},"Number of Preloads"),h.a.createElement("button",{type:"number",id:"balls_scored",onClick:this.incrementPreload,className:"preload increment"},"Preloads: ",this.state.balls_scored),h.a.createElement("button",{type:"number",id:"balls_scored",onClick:this.resetPreload,className:"preload decrement"},"Reset Preloads")),h.a.createElement("div",{className:"input-field"},h.a.createElement("button",{className:"btn pink lighten-1",onSubmit:function(){e.getCurrentTime()},id:"button2"},"Next"))):null,r=h.a.createElement("img",{src:a(273)("".concat("./red-field.jpg")),width:691.6,height:427.7,onClick:this.clicky,id:"clickyimg"}),c=[["Floor Pickup","floor_pickup"],["Station Pickup","station_pickup"],["Stage 2 Activated","stage2_activate"],["Stage 3 Activated","stage3_activate"],["Can Go Through Trench","trench"]].map((function(t){return h.a.createElement(y,{key:t[0],type:Boolean,displayName:t[0],doClick:function(t){e.setState(t)},statename:t[1]})})),i=3===this.state.inMatchView?h.a.createElement("div",{className:"container"},h.a.createElement("div",{className:"input-field"},h.a.createElement("p",{style:{fontWeight:"bold",fontSize:25}},"End of Match Form")),h.a.createElement("table",null,h.a.createElement("tbody",null,c)),h.a.createElement("form",{className:"white",onSubmit:this.handleSubmit},h.a.createElement("div",{className:"input-field"},h.a.createElement("button",{className:"btn pink lighten-1",id:"button4"},"Next")))):null,l=2===this.state.inMatchView?r:null,o=this.state.circle_show?this.Circle(this.state):null,s=2===this.state.inMatchView?h.a.createElement("span",{className:"scoreboard"},h.a.createElement("span",{className:"shots"},this.state.shots.map(function(e,t){return h.a.createElement(b,{onScoreChange:function(e){this.onScoreChange(t,e)}.bind(this),score:e.score,key:t})}.bind(this)))):null,u=2===this.state.inMatchView?h.a.createElement("div",null,h.a.createElement("table",{className:"FieldInput"},h.a.createElement("tbody",null,h.a.createElement("tr",null,h.a.createElement("td",null,h.a.createElement(v,{this:this,index:"0",displayName:"Defence Timer"}),h.a.createElement("br",null)," ",h.a.createElement("br",null),s,h.a.createElement("br",null),h.a.createElement(v,{this:this,index:"1",displayName:"Climb Timer"})),h.a.createElement("td",{width:"500px"},l)))),o,h.a.createElement("div",{className:"input-field"},h.a.createElement("button",{className:"btn pink lighten-1",onClick:this.showEndMatch,id:"button3"},"Next"))):null;return h.a.createElement("div",null,h.a.createElement("div",null),h.a.createElement("span",null,t,n,u,i))}},{key:"componentDidMount",value:function(){document.getElementById("button1").focus()}},{key:"componentDidUpdate",value:function(e,t){t.inMatchView!=this.state.inMatchView&&document.getElementById("button"+(this.state.inMatchView+1)).focus()}}]),t}(m.Component);t.default=Object(E.a)(Object(d.b)((function(e){return{auth:e.firebase.auth}}),(function(e){return{createMatchForm:function(t){return e(Object(p.a)(t))}}}))(N))},123:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(32),r=function(e){return function(t,a,r){var c=(0,r.getFirestore)(),i=a().firebase.profile,l=a().firebase.auth.uid;c.collection("match_forms").add(Object(n.a)({},e,{authorFirstName:i.firstName,authorLastName:i.lastName,authorId:l,createdAt:new Date})).then((function(){t({type:"CREATE_FORM_SUCCESS"})})).catch((function(e){t({type:"CREATE_FORM_ERROR"},e)}))}}},272:function(e,t,a){},273:function(e,t,a){var n={"./Form":117,"./Form.js":117,"./InMatch":118,"./InMatch.js":118,"./blue-field.jpg":534,"./circle.png":535,"./red-field.jpg":536,"./style.css":272};function r(e){var t=c(e);return a(t)}function c(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=c,e.exports=r,r.id=273},342:function(e,t,a){e.exports=a(661)},350:function(e,t,a){},534:function(e,t,a){e.exports=a.p+"static/media/blue-field.66add5fa.jpg"},535:function(e,t,a){e.exports=a.p+"static/media/circle.b1cfca0d.png"},536:function(e,t,a){e.exports=a.p+"static/media/red-field.01b97d62.jpg"},661:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(31),i=a.n(c),l=(a(350),a(11)),o=a(12),s=a(14),u=a(13),m=a(15),h=a(664),d=a(665),p=a(308),f=a(663),E=a(10),g=Object(E.b)(null,(function(e){return{signOut:function(){return e((function(e,t,a){(0,a.getFirebase)().auth().signOut().then((function(){e({type:"SIGNOUT_SUCCESS"})}))}))}}}))((function(e){return r.a.createElement("div",null,r.a.createElement("ul",{className:"right"},r.a.createElement("li",null,r.a.createElement(f.a,{to:"/home"},"Home")),r.a.createElement("li",null,r.a.createElement(f.a,{to:"/pit-scouting"},"Pits")),r.a.createElement("li",null,r.a.createElement(f.a,{to:"/form"},"Form")),r.a.createElement("li",null,r.a.createElement(f.a,{to:"/overall"},"Overall")),r.a.createElement("li",null,r.a.createElement(f.a,{to:"/teams"},"Teams")),r.a.createElement("li",null,r.a.createElement(f.a,{to:"/create-event"},"Configs")),r.a.createElement("li",null,r.a.createElement("a",{onClick:e.signOut},"Log Out")),r.a.createElement("li",null,r.a.createElement(f.a,{to:"/",className:"btn btn-floating pink lighten-1"},e.profile.initials))))})),b=function(){return r.a.createElement("div",null,r.a.createElement("ul",{className:"right"},r.a.createElement("li",null,r.a.createElement(f.a,{to:"/signup"},"Signup")),r.a.createElement("li",null,r.a.createElement(f.a,{to:"/signin"},"Login"))))},v=Object(E.b)((function(e){return{auth:e.firebase.auth,profile:e.firebase.profile}}))((function(e){var t=e.auth,a=e.profile,n=t.uid?r.a.createElement(g,{profile:a}):r.a.createElement(b,null);return r.a.createElement("nav",{className:"nav-wrapper grey darken-3"},r.a.createElement("div",{className:"container"},n))})),y=a(67),N=a.n(y),j=function(e){var t=e.project;return r.a.createElement("div",{className:"card z-depth-0 project-summary"},r.a.createElement("div",{className:"card-content grey-text text-darken-3"},r.a.createElement("span",{className:"card-title "},t.team_num),r.a.createElement("p",null,"Posted by ",t.authorFirstName," ",t.authorLastName),r.a.createElement("p",{className:"grey-text"},N()(t.createdAt.toDate()).calendar())))},C=a(185),O=function(e){var t=e.projects;return r.a.createElement("div",{className:"project-list section"},t&&t.map((function(e){return r.a.createElement(C.a,{to:"/project/"+e.id,key:e.id},r.a.createElement(j,{project:e}))})))},w=function(e){var t=e.notifications;return r.a.createElement("div",{className:"section"},r.a.createElement("div",{className:"card z-depth-0"},r.a.createElement("div",{className:"card-content"},r.a.createElement("span",{className:"card-title"},"Pit Scouting"),r.a.createElement("ul",{className:"online-users"},t&&t.map((function(e){return r.a.createElement("li",{key:e.id},r.a.createElement("span",{className:"pink-text"},e.user," "),r.a.createElement("span",null,e.comments),r.a.createElement("div",{className:"note-date grey-text"},N()(e.time.toDate()).fromNow()))}))))),r.a.createElement("div",null))},S=a(41),_=a(28),k=a(313),x=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.projects,a=e.auth,n=e.notifications;return a.uid?r.a.createElement("div",{className:"dashboard container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 m6"},r.a.createElement(O,{projects:t})),r.a.createElement("div",{className:"col s12 m5 offset-m1"},r.a.createElement(w,{notifications:n})))):r.a.createElement(k.a,{to:"/signin"})}}]),t}(n.Component),T=Object(_.d)(Object(E.b)((function(e){return{projects:e.firestore.ordered.projects,auth:e.firebase.auth,notifications:e.firestore.ordered.notifications}})),Object(S.firestoreConnect)([{collection:"projects",orderBy:["createdAt","desc"]},{collection:"notifications",limit:3,orderBy:["time","desc"]}]))(x),F=Object(_.d)(Object(E.b)((function(e,t){var a=t.match.params.id,n=e.firestore.data.projects;return{project:n?n[a]:null,auth:e.firebase.auth}})),Object(S.firestoreConnect)([{collection:"projects"}]))((function(e){var t=e.project;return e.auth.uid?t?r.a.createElement("div",{className:"container section project-details"},r.a.createElement("div",{className:"card z-depth-0"},r.a.createElement("div",{className:"card-content"},r.a.createElement("span",{className:"card-title"},t.team_num),r.a.createElement("p",null,"Drive Train Speed: ",t.drive_speed),r.a.createElement("p",null,"Shooter Mechanism: ",t.shooter_mech),r.a.createElement("p",null,"Climbing Mechanism: ",t.climb_mech),r.a.createElement("p",null,"Spinner Mechanism: ",t.spin_mech),r.a.createElement("p",null,"Type of Play: ",t.type),r.a.createElement("p",null,"Additional Comments: ",t.comments)),r.a.createElement("div",{className:"card-action grey lighten-4 grey-text"},r.a.createElement("div",null,"Posted by ",t.authorFirstName," ",t.authorLastName),r.a.createElement("div",null,N()(t.createdAt.toDate()).calendar())))):r.a.createElement("div",{className:"container center"},r.a.createElement("p",null,"Loading project...")):r.a.createElement(k.a,{to:"/signin"})})),R=a(9),A=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:""},a.handleChange=function(e){a.setState(Object(R.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.signIn(a.state)},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.authError;return e.auth.uid?r.a.createElement(k.a,{to:"/"}):r.a.createElement("div",{className:"container"},r.a.createElement("form",{className:"white",onSubmit:this.handleSubmit},r.a.createElement("h5",{className:"grey-text text-darken-3"},"Sign In"),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{type:"email",id:"email",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",id:"password",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("button",{className:"btn pink lighten-1 z-depth-0"},"Login"),r.a.createElement("div",{className:"center red-text"},t?r.a.createElement("p",null,t):null))))}}]),t}(n.Component),P=Object(E.b)((function(e){return{authError:e.auth.authError,auth:e.firebase.auth}}),(function(e){return{signIn:function(t){return e((a=t,function(e,t,n){(0,n.getFirebase)().auth().signInWithEmailAndPassword(a.email,a.password).then((function(){e({type:"LOGIN_SUCCESS"})})).catch((function(t){e({type:"LOGIN_ERROR",err:t})}))}));var a}}}))(A),I=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",firstName:"",lastName:""},a.handleChange=function(e){a.setState(Object(R.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.signUp(a.state)},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.auth,a=e.authError;return t.uid?r.a.createElement(k.a,{to:"/"}):r.a.createElement("div",{className:"container"},r.a.createElement("form",{className:"white",onSubmit:this.handleSubmit},r.a.createElement("h5",{className:"grey-text text-darken-3"},"Sign Up"),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{type:"email",id:"email",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",id:"password",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"firstName"},"First Name"),r.a.createElement("input",{type:"text",id:"firstName",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"lastName"},"Last Name"),r.a.createElement("input",{type:"text",id:"lastName",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("button",{className:"btn pink lighten-1 z-depth-0"},"Sign Up"),r.a.createElement("div",{className:"center red-text"},a?r.a.createElement("p",null,a):null))))}}]),t}(n.Component),M=Object(E.b)((function(e){return{auth:e.firebase.auth,authError:e.auth.authError}}),(function(e){return{signUp:function(t){return e((a=t,function(e,t,n){var r=n.getFirebase,c=n.getFirestore,i=r(),l=c();i.auth().createUserWithEmailAndPassword(a.email,a.password).then((function(e){return l.collection("users").doc(e.user.uid).set({firstName:a.firstName,lastName:a.lastName,initials:a.firstName[0]+a.lastName[0]})})).then((function(){e({type:"SIGNUP_SUCCESS"})})).catch((function(t){e({type:"SIGNUP_ERROR",err:t})}))}));var a}}}))(I),D=a(32),B=function(e){return function(t,a,n){var r=(0,n.getFirestore)(),c=a().firebase.profile,i=a().firebase.auth.uid;r.collection("projects").add(Object(D.a)({},e,{authorFirstName:c.firstName,authorLastName:c.lastName,authorId:i,createdAt:new Date})).then((function(){t({type:"CREATE_PROJECT_SUCCESS"})})).catch((function(e){t({type:"CREATE_PROJECT_ERROR"},e)}))}},U=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={team_num:"",drive_speed:"",shooter_mech:"",climb_mech:"",spin_mech:"",type:"",comments:""},a.handleChange=function(e){a.setState(Object(R.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.createProject(a.state),a.props.history.push("/")},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return this.props.auth.uid?r.a.createElement("div",{className:"container"},r.a.createElement("form",{className:"white",onSubmit:this.handleSubmit},r.a.createElement("h5",{className:"grey-text text-darken-3"},"Pit Scouting Comments"),r.a.createElement("div",{className:"input-field"},r.a.createElement("input",{type:"text",id:"team_num",onChange:this.handleChange}),r.a.createElement("label",{htmlFor:"team_num"},"Team Number")),r.a.createElement("div",{className:"input-field"},r.a.createElement("input",{type:"text",id:"drive_speed",onChange:this.handleChange}),r.a.createElement("label",{htmlFor:"drive_speed"},"Drive Train Speed")),r.a.createElement("div",{className:"input-field"},r.a.createElement("input",{type:"text",id:"shooter_mech",onChange:this.handleChange}),r.a.createElement("label",{htmlFor:"shooter_mech"},"Shooter Mechanism")),r.a.createElement("div",{className:"input-field"},r.a.createElement("input",{type:"text",id:"climb_mech",onChange:this.handleChange}),r.a.createElement("label",{htmlFor:"climb_mech"},"Climbing Mechanism")),r.a.createElement("div",{className:"input-field"},r.a.createElement("input",{type:"text",id:"spin_mech",onChange:this.handleChange}),r.a.createElement("label",{htmlFor:"spin_mech"},"Spinner Mechanism")),r.a.createElement("div",{className:"input-field"},r.a.createElement("input",{type:"text",id:"type",onChange:this.handleChange}),r.a.createElement("label",{htmlFor:"type"},"Defense, Offensive, or Both")),r.a.createElement("div",{className:"input-field"},r.a.createElement("textarea",{id:"comments",className:"materialize-textarea",onChange:this.handleChange}),r.a.createElement("label",{htmlFor:"comments"},"Comments")),r.a.createElement("div",{className:"input-field"},r.a.createElement("button",{className:"btn pink lighten-1"},"Create")))):r.a.createElement(k.a,{to:"/signin"})}}]),t}(n.Component),V=Object(E.b)((function(e){return{auth:e.firebase.auth}}),(function(e){return{createProject:function(t){return e(B(t))}}}))(U),L=a(25),G=a.n(L),z=a(37),X=[];function K(e){return Math.floor(Math.random()*Math.floor(e))}!function(){var e,t,a,n;G.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,G.a.awrap(fetch("https://www.thebluealliance.com/api/v3/event/2020onosh/teams",{headers:{"X-TBA-Auth-Key":"rVSoi1uFgP4KkYnjXvjtFdakv662U7rCi3wtFZ1jwNcQTiphjrlveXAo6fYG7mt7"}}));case 2:return e=r.sent,r.next=5,G.a.awrap(e.json());case 5:for(t=r.sent,a=0;a<t.length;a++)X.push((n={TeamNumber:t[a].team_number,CycleTime:K(100)},Object(R.a)(n,"CycleTime",K(100)),Object(R.a)(n,"Upper",K(100)),Object(R.a)(n,"Lower",K(100)),Object(R.a)(n,"Miss",K(100)),Object(R.a)(n,"ClimbTime",K(100)),Object(R.a)(n,"Preloads",K(100)),n));console.log(X);case 8:case"end":return r.stop()}}))}();var W=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"card text-center"},r.a.createElement("div",{className:"card-header"},"Overall Table"),r.a.createElement("div",{className:"card-body"},r.a.createElement(z.BootstrapTable,{ref:"table",data:X,multiColumnSort:2},r.a.createElement(z.TableHeaderColumn,{width:"120",dataField:"TeamNumber",isKey:!0,dataSort:!0},"Team #"),r.a.createElement(z.TableHeaderColumn,{width:"120",dataField:"CycleTime",dataSort:!0},"Avg. Cycle Time"),r.a.createElement(z.TableHeaderColumn,{width:"120",dataField:"Upper",dataSort:!0},"Avg. Balls Upper"),r.a.createElement(z.TableHeaderColumn,{width:"120",dataField:"Lower",dataSort:!0},"Avg. Balls Lower"),r.a.createElement(z.TableHeaderColumn,{width:"120",dataField:"Miss",dataSort:!0},"Avg. Balls Missed"),r.a.createElement(z.TableHeaderColumn,{width:"120",dataField:"ClimbTime",dataSort:!0},"Avg. Climb Time"),r.a.createElement(z.TableHeaderColumn,{width:"120",dataField:"ClimbTime",dataSort:!0},"Avg. Defence Time"),r.a.createElement(z.TableHeaderColumn,{width:"120",dataField:"Preloads",dataSort:!0},"Avg. Preloads"))))}}]),t}(n.Component),H=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={title:"",content:""},a.handleChange=function(e){a.setState(Object(R.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.createProject(a.state),a.props.history.push("/")},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return this.props.auth.uid?r.a.createElement("div",null,r.a.createElement(W,null)):r.a.createElement(k.a,{to:"/signin"})}}]),t}(n.Component),Y=Object(E.b)((function(e){return{auth:e.firebase.auth}}),(function(e){return{createProject:function(t){return e(B(t))}}}))(H),J=a(117),Q=a(119),Z=a(42),$=[{name:"Page A",uv:4e3,pv:2400,amt:2400},{name:"Page B",uv:3e3,pv:1398,amt:2210},{name:"Page C",uv:2e3,pv:9800,amt:2290},{name:"Page D",uv:2780,pv:3908,amt:2e3},{name:"Page E",uv:1890,pv:4800,amt:2181},{name:"Page F",uv:2390,pv:3800,amt:2500},{name:"Page G",uv:3490,pv:4300,amt:2100}],q=[];!function(){var e,t,a;G.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,G.a.awrap(fetch("https://www.thebluealliance.com/api/v3/event/2020onosh/teams",{headers:{"X-TBA-Auth-Key":"rVSoi1uFgP4KkYnjXvjtFdakv662U7rCi3wtFZ1jwNcQTiphjrlveXAo6fYG7mt7"}}));case 2:return e=n.sent,n.next=5,G.a.awrap(e.json());case 5:for(t=n.sent,a=0;a<t.length;a++)q.push(t[a].team_number);console.log(q);case 8:case"end":return n.stop()}}))}();var ee=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).charts=a.charts.bind(Object(Q.a)(a)),a.state={chartVisible:[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],o:0,p:0},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){for(var e=this,t=[],a=0;a<q.length;a++)t.push(q[a]);var n=0,c=0;return r.a.createElement("div",{className:"card text-center"},r.a.createElement("div",{className:"card-header"},"Teams"),r.a.createElement("div",{className:"card-body"},r.a.createElement("div",{className:"align-baseline",role:"group","aria-label":"Basic example"},t.map((function(a,i){return r.a.createElement("button",{onClick:function(){return e.onClicked(a,i)},key:t[c++]},t[n++])}))),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",{className:"align-baseline",role:"group"},this.state.chartVisible.map((function(a,n){return r.a.createElement("td",{key:n,style:{color:"red"}},e.state.chartVisible[n]?e.charts(t[n]):null)})))))))}},{key:"onClicked",value:function(e,t){var a=this;this.setState((function(){return a.state.chartVisible[t]=!a.state.chartVisible[t]})),console.log("team: "+e),this.setState({o:e}),this.state.p=t}},{key:"charts",value:function(e){return r.a.createElement("div",null,"Info about the team: ",e,console.log(e),r.a.createElement(Z.b,{width:300,height:300,data:$,margin:{top:0,right:0,left:0,bottom:0}},r.a.createElement(Z.c,{strokeDasharray:"3 3"}),r.a.createElement(Z.f,{dataKey:"name"}),r.a.createElement(Z.g,null),r.a.createElement(Z.e,null),r.a.createElement(Z.d,null),r.a.createElement(Z.a,{dataKey:"pv",stackId:"a",fill:"#8884d8"}),r.a.createElement(Z.a,{dataKey:"uv",stackId:"a",fill:"#82ca9d"})))}}]),t}(n.Component),te=[],ae=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){a.setState(Object(R.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.createEvent(a.state),console.log(a.state),console.log(a.state.teams),a.props.history.push("/")},a.state={event_id:"",teams:[]},function(){var e,t,a;G.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,G.a.awrap(fetch("https://www.thebluealliance.com/api/v3/event/".concat("2020onwat","/teams"),{headers:{"X-TBA-Auth-Key":"rVSoi1uFgP4KkYnjXvjtFdakv662U7rCi3wtFZ1jwNcQTiphjrlveXAo6fYG7mt7"}}));case 2:return e=n.sent,n.next=5,G.a.awrap(e.json());case 5:for(t=n.sent,a=0;a<t.length;a++)te.push(t[a].team_number);case 7:case"end":return n.stop()}}))}(),a.state.teams=te,a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return this.props.auth.uid?r.a.createElement("div",{className:"container"},r.a.createElement("form",{className:"white",onSubmit:this.handleSubmit},r.a.createElement("h5",{className:"grey-text text-darken-3"},"Create Teams For Event"),r.a.createElement("div",{className:"input-field"},r.a.createElement("input",{type:"text",id:"event_id",onChange:this.handleChange}),r.a.createElement("label",{htmlFor:"event_id"},"Event ID")),r.a.createElement("div",{className:"input-field"},r.a.createElement("button",{className:"btn pink lighten-1"},"Create")))):r.a.createElement(k.a,{to:"/signin"})}}]),t}(n.Component),ne=Object(E.b)((function(e){return{auth:e.firebase.auth}}),(function(e){return{createEvent:function(t){return e((a=t,function(e,t,n){(0,n.getFirestore)().collection("events").add(Object(D.a)({},a,{createdAt:new Date})).then((function(){e({type:"CREATE_EVENT_SUCCESS"})})).catch((function(t){e({type:"CREATE_EVENT_ERROR"},t)}))}));var a}}}))(ae),re=(a(627),function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(h.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(v,null),r.a.createElement(d.a,null,r.a.createElement(p.a,{exact:!0,path:"/home",component:T}),r.a.createElement(p.a,{path:"/project/:id",component:F}),r.a.createElement(p.a,{path:"/signin",component:P}),r.a.createElement(p.a,{path:"/signup",component:M}),r.a.createElement(p.a,{path:"/overall",component:Y}),r.a.createElement(p.a,{path:"/pit-scouting",component:V}),r.a.createElement(p.a,{path:"/form",component:J.default}),r.a.createElement(p.a,{path:"/teams",component:ee}),r.a.createElement(p.a,{path:"/create-event",component:ne}))))}}]),t}(n.Component)),ce=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ie(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("","/service-worker.js");ce?(!function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):le(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):le(e)}))}}function le(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var oe={authError:null},se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_ERROR":return console.log("login error"),Object(D.a)({},e,{authError:"Login failed"});case"LOGIN_SUCCESS":return console.log("login success"),Object(D.a)({},e,{authError:null});case"SIGNOUT_SUCCESS":return console.log("signout success"),e;case"SIGNUP_SUCCESS":return console.log("signup success"),Object(D.a)({},e,{authError:null});case"SIGNUP_ERROR":return console.log("signup error"),Object(D.a)({},e,{authError:t.err.message});default:return e}},ue={},me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_PROJECT_SUCCESS":return console.log("create project success"),e;case"CREATE_PROJECT_ERROR":return console.log("create project error"),e;default:return e}},he={},de=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:he,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_EVENT_SUCCESS":return console.log("create event success"),e;case"CREATE_EVENT_ERROR":return console.log("create event error"),e;default:return e}},pe=a(86),fe=Object(_.c)({auth:se,project:me,team:de,firestore:pe.firestoreReducer,firebase:S.firebaseReducer}),Ee=a(312),ge=a(126),be=a.n(ge);a(304),a(657);be.a.initializeApp({apiKey:"AIzaSyAvQvZk-kSfCdphxw1U775GMEXBG5kD_lU",authDomain:"timothy-scoutingapp.firebaseapp.com",databaseURL:"https://timothy-scoutingapp.firebaseio.com",projectId:"timothy-scoutingapp",storageBucket:"timothy-scoutingapp.appspot.com",messagingSenderId:"283807375591",appId:"1:283807375591:web:aa58051441617e8fc9c242",measurementId:"G-W702XMZYSM"}),a(304),a(659),be.a.firestore().settings({timestampsInSnapshots:!0});var ve=be.a,ye=Object(_.e)(fe,Object(_.d)(Object(_.a)(Ee.a.withExtraArgument({getFirebase:S.getFirebase,getFirestore:pe.getFirestore})),Object(S.reactReduxFirebase)(ve,{userProfile:"users",useFirestoreForProfile:!0,attachAuthIsReady:!0}),Object(pe.reduxFirestore)(ve)));ye.firebaseAuthIsReady.then((function(){i.a.render(r.a.createElement(E.a,{store:ye},r.a.createElement(re,null)),document.getElementById("root")),ie()}))}},[[342,1,2]]]);
//# sourceMappingURL=main.57e697b8.chunk.js.map