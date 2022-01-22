import{ArtisanTime} from '../models/ArtisanTime.js';

const ArtisanTimeController = {
     createArtisanTime : async(req, res) => {
         const{timeIn, timeOut} = req.body;
         if(!timeIn){
             return res.status(401).json({status:'fail', message: 'please enter timeIn and expected timeout'})
         }
         try{
             const newArtisanTime = new ArtisanTime(req.body);
             const artisanTime = await newArtisanTime.save();
             if(!artisanTime){
                 return res
                 .status(401).json({status:'fail', message: 'something went wrong'})
             }
             return res
             .status(201)
             .json({status:'success', message: 'successful', data: artisanTime})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err',err})
         }
     },

     getArtisanTime : async(req, res) =>{
         try{
             const ArtisanTimes = await ArtisanTime.find({}).lean().exec();
             return res 
             .status(201)
             .json({status:'success', message: 'Successful', data: ArtisanTimes})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
     },
     editArtisanTime : async(req, res) =>{
         const {id} = req.params;
         const {title, message} = req.body;

         if(!title || !message){
             return res
             .status(400).json({status:'fail', message: 'Select field to update'
            })
         }
         try{
            const ArtisanTime = await ArtisanTime.findById(id).exec();
            ArtisanTime.title = title;
            ArtisanTime.message = message;
            await ArtisanTime.save();

            if(!ArtisanTime)
            return res
            .status(404).json({status:'fail', message:'error updating'});
            return res.status(200).json({status:'success', message:'successful update', data: ArtisanTime})
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
export default ArtisanTimeController;