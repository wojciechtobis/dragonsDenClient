export class BinaryPrediction{

    boostedPrediction: string;
    boostedProbability: number;
    forestPrediction: string;
    forestProbability: number;
    logisticPrediction: string;
    logisticProbability: number;
    nnetPrediction: string;
    nnetProbability: number;
    cycle: number
    id: number;
    test_id: number;
    
    constructor(data?){
        this.boostedPrediction = data['Boosted_Prediction'] !== undefined ? data['Boosted_Prediction'] : null;
        this.boostedProbability = data['Boosted_Probability'] !== undefined ? data['Boosted_Probability'] : null;
        this.forestPrediction = data['Forest_Prediction'] !== undefined ? data['Forest_Prediction'] : null;
        this.forestProbability = data['Forest_Probability'] !== undefined ? data['Forest_Probability'] : null;
        this.logisticPrediction = data['Logistic_Prediction'] !== undefined ? data['Logistic_Prediction'] : null;
        this.logisticProbability = data['Logistic_Probability'] !== undefined ? data['Logistic_Probability'] : null;
        this.nnetPrediction = data['Nnet_Prediction'] !== undefined ? data['Nnet_Prediction'] : null;
        this.nnetProbability = data['Nnet_Probability'] !== undefined ? data['Nnet_Probability'] : null;
        this.cycle = data['cycle'] !== undefined ? data['cycle'] : null;
        this.id = data['id'] !== undefined ? data['id'] : null;
        this.test_id = data['test_id'] !== undefined ? data['test_id'] : null;
    }
}