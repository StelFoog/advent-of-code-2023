import { setInput } from './inputManager';
import { getInput, getTask, getTaskFile, taskFinder } from './util';

const [_bun, _filePath, tempTask = 'latest', tempUseExample = 'false'] = Bun.argv;

const taskSelection = taskFinder(tempTask);

const task = await getTask(taskSelection);

const input = await getInput(
	Number(task.split('-')[0]),
	['t', 'true', 'y', 'yes'].includes(tempUseExample)
);
setInput(input.trim());

await import(getTaskFile(task));
