import{Recommendation} from '../models/Recommendation.js';

const RecommendationController = {
     createRecommendation : async(req, res) => {
         const{artisanProfession, artisanName, artisanNo,recommendToName, recommendToPhoneNo} = req.body;
         
         if(!artisanProfession || !artisanName || !artisanNo || !recommendToName || !recommendToPhoneNo){
             return res.status(401).json({status:'fail', message: 'please enter all required fields'})
         } 
         try{
             const newRecommendation = new Recommendation(req.body);
             const recommendation = await newRecommendation.save();
             if(!recommendation){
                 return res
                 .status(401).json({status:'fail', message: 'something went wrong'})
             }
             return res
             .status(201)
             .json({status:'success', message: 'successful', data: recommendation})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err',err})
         }
     },

     getRecommendations : async(req, res) =>{
         try{
             const recommendations = await Recommendation.find({}).lean().exec();
             return res 
             .status(201)
             .json({status:'success', message: 'Successful', data: recommendations})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
     },
     editRecommendation : async(req, res) =>{
         const {id} = req.params;
         const {artisanName,artisanNo,recommendToName, recommendToPhoneNo,artisanProfession} = req.body;

         if(!artisanProfession ||!artisanName || !artisanNo || !recommendToName || !recommendToPhoneNo){
             return res
             .status(400).json({status:'fail', message: 'Select field to update'
            })
         }
         try{
            const recommendation = await Recommendation.findById(id).exec();
            recommendation.artisanName = artisanName;
            recommendation.artisanNo =artisanNo;
            recommendation.recommendToName= recommendToName;

            await Recommendation.save();

            if(!recommendation)
            return res
            .status(404).json({status:'fail', message:'error updating'});
            return res.status(200).json({status:'success', message:'successful update', data: recommendation})
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
export default RecommendationController;