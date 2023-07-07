export default {
    name: 'Test1Job',
    async handle(data){
        console.log('Test1Job LOG: ', {data});
    }
}