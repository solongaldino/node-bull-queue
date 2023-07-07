import Queue from 'bull';
import * as queues from '../queues';
import * as jobs from '../jobs';
import * as consumers from '../consumers';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

export const QueuesSingleton = (function () {
    let instance = [];

    function createInstance(queue) {
        const object = new Queue(queue.name, { redis: queue.options.redis, settings: { stalledInterval: 0 } })
        return object;
    }

    return {
        getInstance: function (queue) {
            if (!instance[queue.name]) {
                instance[queue.name] = createInstance(queue);
            }
            return instance[queue.name];
        }
    };
})();

export const allQueues = Object.values(queues).map(queue => ({
    bull: QueuesSingleton.getInstance(queue)
}));

export const allJobs = Object.values(jobs);

export function findQueueByName(queueName){
    return allQueues.find(q => q.bull.name === queueName);
}

export function findJobByName(jobName){
    return allJobs.find(job => job.name === jobName);
}

export async function addJob({jobName, queueName, payload, options}) {
    let queue = findQueueByName(queueName);
    await queue.bull.add({ jobName, payload }, options ? options : {});
}

export const externalUriBoard  = '/bull-dashboard';

export function run(app){

    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath(externalUriBoard);

    createBullBoard({
        queues: allQueues.map(queue => (new BullAdapter(queue.bull))),
        serverAdapter: serverAdapter,
    });

    app.use(externalUriBoard, serverAdapter.getRouter());

    Object.values(consumers).forEach(consumer => consumer());

}