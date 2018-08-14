export class RegressionPrediction{

    forestPrediction: number;
    boostedPrediction: number;
    poissonPrediction: number;
    nnetPrediction: number;
    cycle: number
    id: number;
    test_id: number;

    constructor(data?){
        this.forestPrediction = data['Forest_Prediction'] !== undefined ? data['Forest_Prediction'] : null;
        this.boostedPrediction = data['Boosted_Prediction'] !== undefined ? data['Boosted_Prediction'] : null;
        this.poissonPrediction = data['Poisson_Prediction'] !== undefined ? data['Poisson_Prediction'] : null;
        this.nnetPrediction = data['Nnet_Prediction'] !== undefined ? data['Nnet_Prediction'] : null;
        this.cycle = data['cycle'] !== undefined ? data['cycle'] : null;
        this.id = data['id'] !== undefined ? data['id'] : null;
        this.test_id = data['test_id'] !== undefined ? data['test_id'] : null;
    }
}