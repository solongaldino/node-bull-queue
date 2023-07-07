import Queue from 'bull';
import * as queues from './queues';
import * as jobs from './jobs';

export const allQueues = Object.values(queues).map(queue => ({
    bull: new Queue(queue.name, { redis: queue.options.redis, settings: { stalledInterval: 0 } })
}));

export const allJobs = Object.values(jobs);

export function findQueueByName(queueName){
    return allQueues.find(q => q.bull.name === queueName);
}

export function findJobByName(jobName){
    return allJobs.find(job => job.name === jobName);
}

export function addJob({jobName, queueName, data, options}) {

    let job = findJobByName(jobName);
    let queue = findQueueByName(queueName);
    
    queue.bull.add({ job, queue, payload: data }, options ? options : {});
}

export function processAllQueue(){

}