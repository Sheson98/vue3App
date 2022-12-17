import {defineStore ,storeToRefs} from 'pinia'
import { TabProps, TabsState } from '../interface'
import router from '@/routers'
const TabsStore = defineStore({
    id:"TabsStore",
    state:():TabsState=>({
        currentTab:{
            title:'',
            name:""
        },
        tabs:[]
    }),
    getters:{
        currentTabGet:state=>state.currentTab,
        tabsGet:state=>state.tabs
    },
    actions:{
        async setCurrentTab(currentTab:TabProps){
            this.currentTab = currentTab
        },
        async addTab(tab:TabProps){
            this.tabs.push(tab)
            this.tabs =  this.tabs.reduce((pre:TabProps[],now)=>pre.findIndex(m=>m.name === now.name)>-1?[...pre]:[...pre,now],[]);//去重
            this.currentTab = tab
          },
         async removeTab(tabName:string){
            const names = this.tabs.map(m=>m.name)
            this.tabs = this.tabs.filter(m=>m.name!==tabName)
            // if(indexSign=="last"){
            //     this.currentTab = this.tabs[this.tabs.length-1]
            // }
            // if(indexSign =="start"){
            //     this.currentTab = this.tabs[0]
            // }
            
         },
         async changeTab(tabName:string){
           const {title} =  this.tabs.find(m=>m.name == tabName)??{}
           this.setCurrentTab({
            name:tabName,
            title:title??""
           })
           router.push(tabName)
         }
         },
        
})
export default  TabsStore