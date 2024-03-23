export interface PersonInter{
    id:string
    name:string
    age:number
}

export type PersonList = Array<PersonInter>
export type PersonList2 = PersonInter[]
