/*
	Process management functions. Provides wrapper over Job class.
	Maintains a job queue which gets worked on from both ends simultaneously to prevent starving 
	of one end. Jobs get added to the bottom of the queue with addJob. runJobs must be run 
	periodically in order to update the queue and spawn new jobs.

	Originally produced by Chris Gibb at the Thunder Bay Regional Research Institute 
    under the supervision of Dr. Ingeborg Zehbe
    Part of the PHAT Project
    Author: gibbc@tbh.net
*/
var jobs = new Array();
var switchEnds = false;
var Job = require('./Job.js');
module.exports.maxJobs = 1;
/*
	Updates job queue.
	Removes completed jobs and starts new ones.
*/
module.exports.runJobs = function()
{
	var runningJobs = 0;
	for(var i in jobs)
	{
		if(jobs[i].running)
			runningJobs++;
		if(runningJobs >= module.exports.maxJobs)
			return;
		if(jobs[i].done)
		{
			jobs.splice(i,1);
		}
	}
	//available thread for new job
	//start next job at the front of the queue
	if(!switchEnds)
	{
		for(var i in jobs)
		{
			if(!jobs[i].running && !jobs[i].done)
			{
				jobs[i].Run();
				runningJobs++;
			}
			if(runningJobs >= module.exports.maxJobs)
				break;
		}
	}
	//start last job in the queue
	if(switchEnds)
	{
		for(var i = jobs.length-1; i > 0; i--)
		{
			if(!jobs[i].running && !jobs[i].done)
			{
				jobs[i].Run();
				runningJobs++;
			}
			if(runningJobs >= module.exports.maxJobs)
				break;
		}
	}
	if(switchEnds)
	{
		switchEnds = false;
		return;
	}
	if(!switchEnds)
	{
		switchEnds = true;
		return;
	}
}
/*
	Wrapper over Job creation. See Job.js for more details.
*/
module.exports.addJob = function(processName,args,callBackChannel,unBuffer,callBackObj,extraData)
{
    jobs.push(new Job(processName,args,callBackChannel,unBuffer,callBackObj,extraData));
}

module.exports.findJob = function(jobName,callBack)
{
	var res = false;
	for(var i in jobs)
	{
		if(jobs[i].running)
		{
			res = callBack(jobs[i]);
			if(res)
				return;
		}
	}
}