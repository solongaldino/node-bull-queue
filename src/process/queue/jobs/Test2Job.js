export default {
    name: 'Test2Job',
    async handle({data}){
        console.log('Test2Job LOG: ', {data});
    }
}