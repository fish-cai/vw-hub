<template>
    <div class="pserson">
        姓:<input type="text" v-model="firstName"><br>
        名:<input type="text" v-model="lastName"><br>
        <button @click="changFullName">酱全名修改为li-si</button>
        全名：<span>{{fullName}}</span><br>
    </div>
</template>
<script lang="ts" setup name="Person">
import {ref,computed} from 'vue'
//接口
import {type PersonInter,type PersonList} from '@/types'


let firstName = ref('zhang')
let lastName = ref('san')
//这么定义的fullname是一个计算属性，只读不可改
// let fullName = computed(()=>{
//     return firstName.value.slice(0,1).toUpperCase() + firstName.value.slice(1)+"-"+lastName.value
// })
let person:PersonInter = {id:"12",name:"222",age:222}
let personList:Array<PersonInter> = [
    {id:"12",name:"222",age:222},
    {id:"12",name:"222",age:22},
    {id:"12",name:"222",age:2}
]
let personList2 :PersonList = [
    {id:"12",name:"222",age:222},
    {id:"12",name:"222",age:22},
    {id:"12",name:"222",age:2}
]

let fullName = computed({
    get() {
        return firstName.value.slice(0,1).toUpperCase() + firstName.value.slice(1)+"-"+lastName.value
    },
    
    set(val) {
        const [str1,str2] = val.split("-")
        firstName.value = str1
        lastName.value = str2
    }
    
    
})
function changFullName(){
    fullName.value = "li-si"
}
</script>
<style>
    
</style>