
import {Building} from '../models/Building.js'

const BuildingController = {
     createBuilding: async(req, res) => {
         const{ streetName,buildingNo, numberOfFlats} = req.body;
         if(!streetName || !buildingNo || !numberOfFlats){
             return res.status(401).json({status:'fail', message: 'please enter building number, street name and number of flats'})
         }
         try{
             const newBuilding = new Building(req.body);
             const building = await newBuilding.save();
             if(!building){
                 return res
                 .status(401).json({status:'fail', message: 'something went wrong'})
             }
             return res
             .status(201)
             .json({status:'success', message: 'successful', data: building})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err',err})
         }
     },

     getBuilding : async(req, res) =>{
         try{
             const building = await Building.find({}).lean().exec();
             return res 
             .status(201)
             .json({status:'success', message: 'Successful', data: building})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
     },
     editBuilding : async(req, res) =>{
         const {id} = req.params;
         const {name } = req.body;

         if(!name){
             return res
             .status(400).json({status:'fail', message: 'Select field to update'
            })
         }
         try{
            const building = await Building.findById(id).exec();
            building.name = name;
            await building.save();

            if(!building)
            return res
            .status(404).json({status:'fail', message:'error updating'});
            return res.status(200).json({status:'success', message:'successful update', data: building})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
        
    
     }
}
export default BuildingController;