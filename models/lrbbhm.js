const Sequelize = require("sequelize")
const {DataTypes, Model} = Sequelize



const db = new Sequelize(process.env.DB_NAME || 'lrbbhm',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',{
    dialect:"mysql",
    host: process.env.DB_HOST || 'localhost',
    define:{
        freezeTableName: true,
        timestamps: false
    }
})



class User extends Model{
}

User.init({
    idUser:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    pseudo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize:db,
    modelName:"user"
})


class Tournoi extends Model{

}

Tournoi.init({
    idTournoi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomTournoi:{
        type: DataTypes.STRING,
        allowNull:false
    },
    lieuTournoi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateDebut: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dateFin: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{
    sequelize:db,
    modelName:"tournoi"
})


class Rencontre extends Model {}
 Rencontre.init({
    idRencontre: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    lieuRencontre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateRencontre:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    heureRencontre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sexe:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tempsDeJeu:{
        type:DataTypes.STRING,
        defaultValue:"00:00:00",
    },
    
},{
    sequelize: db,
    modelName:"rencontre"
})


// (1,n) - (1,1)
Tournoi.hasMany(Rencontre)
Rencontre.belongsTo(Tournoi)

class Equipe extends Model{}
Equipe.init({
    idEquipe:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nomEquipe:{
        type: DataTypes.STRING,
        allowNull: false
    },
    origineEquipe:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tel:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize:db,
    modelName:"equipe"
})

class Participer extends Model {}
Participer.init({},{sequelize:db, modelName:"Participer"})

Equipe.belongsToMany(Tournoi, {through: Participer})
Tournoi.belongsToMany(Equipe,  {through: Participer})


class Joueur extends Model{}

Joueur.init({
    idJoueur:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomJoueur:{
        type: DataTypes.STRING,
        allowNull: false
    },
    prenomJoueur:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dateNaissance:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    numeroMaillot:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tel:{
        type: DataTypes.STRING,
        allowNull: false
    },
    CIN:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sexe:{
        type:DataTypes.STRING,
        defaultValue : "M"
    }
},{
    sequelize:db,
    modelName: "joueur"
})

Equipe.hasMany(Joueur)
Joueur.belongsTo(Equipe)

class Categorie extends Model{}
Categorie.init({
    idCategorie:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categorie:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize:db,
    modelName:"categorie"
})

Categorie.hasMany(Joueur)
Joueur.belongsTo(Categorie)

Categorie.hasMany(Rencontre)
Rencontre.belongsTo(Categorie)



class Coach extends Model {

    static getAll(){
        return this.findAll({raw:true})

    }

    static getTest(){
        return "ceci est un test"
    }
}

Coach.init({
    idCoach:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomCoach: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenomCoach: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tel:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: 10
        }
    },
    CIN: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: 10
        }
    },
    sexe:{
        type: DataTypes.STRING,       
        defaultValue : "M"
    }
},{
    sequelize: db,
    modelName:"coach"
})

Equipe.hasMany(Coach)
Coach.belongsTo(Equipe)

Equipe.hasOne(Rencontre, {as: "home", foreignKey: "idEquipe1"})
Equipe.hasOne(Rencontre,{as: "challenger", foreignKey: "idEquipe2"})



class StatJoueur extends Model{}

StatJoueur.init({
  
    totalPointMarque:{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    tirsRates:{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    tirsReussis:{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    perteDeBalle:{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    blockRealise:{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    passeD:{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    tempsJoue:{
        type: DataTypes.STRING,
        defaultValue:"00:00:00"
    },
    onSet:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    }
},{sequelize:db, modelName:"statJoueur"})


Rencontre.belongsToMany(Joueur, {through: StatJoueur})
Joueur.belongsToMany(Rencontre,{through: StatJoueur})





db.sync({alter:true}).then(data=>{ 
    
    console.log("connected!!!")
    User.findOne({where: {pseudo:"admin"}}).then(data=>{
        console.log("data no tokony ho ita eto");
        
        if(data){
            console.log("misy");
            
        }else{
            console.log("Tsisy de mamorona");

            User.create({
                pseudo:"admin",
                password:"admin"
            })
            
        }
        
    })
    
    

})

module.exports = {
    Tournoi, Rencontre, Equipe, Joueur, StatJoueur, Coach, Categorie, Participer, User, db
}

