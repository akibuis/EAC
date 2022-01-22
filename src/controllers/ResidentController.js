import {Resident} from '../models/Resident.js'





const ResidentController = {
     createResident : async(req, res) => {

         const user = req.params._id;
        //  console.log(req.body.user.id)
         const{firstname, lastname,residentType,residentCode,buildingNo} = req.body;
         const body = req.body
         if(!firstname || !lastname || !residentType || !residentCode || !buildingNo){
             return res.status(401).json({status:'fail', message: 'please enter all the neccessary fields'})
         }
         try{
             const newResident = new Resident(req.body, user);
             const resident = await newResident.save();
             if(!resident){
                 return res
                 .status(401).json({status:'fail', message: 'something went wrong'})
             }
             return res
             .status(201)
             .json({status:'success', message: 'successful', data: resident})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err',err})
         }
     },

     getResidents : async(req, res) =>{
         try{
             const residents = await Resident.find({}).lean().exec();
             return res 
             .status(201)
             .json({status:'success', message: 'Successful', data: residents})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
     },
     editResident : async(req, res) =>{
         const {id} = req.params;
         const {title, message} = req.body;

         if(!title || !message){
             return res
             .status(400).json({status:'fail', message: 'Select field to update'
            })
         }
         try{
            const resident = await Resident.findById(id).exec();
            resident.title = title;
            resident.message = message;
            await Resident.save();

            if(!resident)
            return res
            .status(404).json({status:'fail', message:'error updating'});
            return res.status(200).json({status:'success', message:'successful update', data: resident})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
        
    
     },
    //  removeVisitorTypes: async (req, res) => { 
    
    //     const { id } = req.params;
    //     try {
    //     const visitorType = await VisitorType.findById(id);
    //     visitorType.deleteOne();
        

    //     if (visitorType) {
    //         return res.status(200).json({ 
    //             status: 'success',
    //             message: 'visitor type removed', 
    //         });
    //     } 
    //     else {
    //         return res.status(400).json({ 
    //             status: 'fail',
    //             message: 'visitor type  not found.', 
    //         });
    //     }
            

    //     } catch (err) {
    //     return res.status(500).json({ 
    //         status: 'fail', 
    //         message: 'server err', 
    //         err 
    //         });
    //     }
    // },
    // removeAllVisitorTypes: async (req, res) => { 
    //     try {
    //     const visitorType = await VisitorType.deleteMany({visitorType});

    //     if (visitorType) {
    //         return res.status(200).json({ 
    //             status: 'success',
    //             message: 'All visitor types removed successfully', 
    //         });
    //     } 
    //     else {
    //         return res.status(400).json({ 
    //             status: 'fail',
    //             message: 'visitor type not found.', 
    //         });
    //     }
            

    //     } catch (err) {
    //     return res.status(500).json({ 
    //         status: 'fail', 
    //         message: 'server err', 
    //         err 
    //         });
    //     }
    // },
}
export default ResidentController;