import { findQueueByName } from '../domain'
import ChangeQueue from '../queues'

export default function ChangeConsumer(){
    const queue = findQueueByName(ChangeQueue.name);
    queue.bull.process((job) => {
        console.log({job});
    });
}