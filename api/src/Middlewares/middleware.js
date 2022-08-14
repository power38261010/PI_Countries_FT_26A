const axios = require ('axios');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const { Country, Activity } = require("../db");
const { API_ALL } = process.env;

const LoadDB = async () =>
{
  try
  {
    const AllCountApi = await axios.get(API_ALL);
    const ModelCountries = AllCountApi.data.map((c) =>{
      return {
        id: c.cca3,
        name: c.name.common,
        flag: c.flags[0],
        continent: c.continents[0],
        capital: c.capital,
        subregion: c.subregion,
        area: c.area,
        population: c.population
      };  });
    await Country.bulkCreate(ModelCountries)
    console.log('DB success')
  }
  catch (error) {  return { info: error.message}; }  
}

const getAllCountries = async ( name ) =>
{
try
{
      const aux = await Country.findAll({ include: { model: Activity, attributes: ['name', 'difficulty', 'duration', 'season'],
            through: { attributes: [],  }  } })

        if ( !name )  {  return aux; }
        else
        {
          let countryName = await aux.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
          return countryName;
        }
}
catch (error) {console.log("Error : "+error); return [] }
};

const getCountryId = async (idPais) =>
{
  const aux = await Country.findAll({ include: { model: Activity, attributes: ['name', 'difficulty', 'duration', 'season'],
  through: { attributes: [],  }  } })
    try
    {
      let countryId = await aux.filter(el => el.id == idPais.toUpperCase())
      return countryId;
    }
    catch (error)  { console.log("Error: "+ error); return [] }
}

const newActivity = async( name, difficulty, duration, season, countryId ) =>
{
try
{
  if( countryId.length > 0 && name.length > 0 )
  {
  const createActivity = await Activity.create({ name, difficulty, duration, season, countryId})
  const countries = await Country.findAll({ where: { id: countryId } })
  createActivity.addCountries(countries)
  return createActivity ;
  }
  else { return { info: " El nombre y/o pais/es son campos obligatorios"} }
}
catch (error) { console.log("Error Fatal: "+error); return [] }
};

const getAllActivities = async () =>
{
      try
      {
        allAct =  await Activity.findAll({ include : Country})
        return allAct;
      }
      catch(error){ console.log("Error: " + error); return [] }
}

const deleteActivity = async (id) =>
{
  try
  {
  await Activity.destroy({where: {id} })
  return { info : "Actividad Eliminada"};
  }
  catch (error) { console.log("Error: " + error);}
}

module.exports= {LoadDB,
  getAllCountries,
  getCountryId,
  newActivity,
  getAllActivities,
  deleteActivity}