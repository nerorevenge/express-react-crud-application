import Sequelize from 'sequelize';
import {readFileSync} from 'fs';

const credentials = JSON.parse(readFileSync('./credential.json', 'utf8'));

export const seq = new Sequelize(credentials.db
	                       ,credentials.username
												 ,credentials.password
		                     ,{host:'localhost',dialect:'mysql'})

const model  = seq.define('poll', {
                  name: Sequelize.STRING,
                  rank: Sequelize.INTEGER,
                },{timestamps: false})

// ==================  CRUD STUFF =============================================

export function show () { return model.findAll()}

export function create (name, rank) {
  return model
          .create({name: name, rank: rank})
}

export function update (id,name,rank) {
  var body = clean({name: name, rank: rank})
	console.log(body)
	return model
         .update(body,{where: {id:id}})
}

export function deleter (id) { return model.destroy({where: {id: id}}) }

//===========================================================================
