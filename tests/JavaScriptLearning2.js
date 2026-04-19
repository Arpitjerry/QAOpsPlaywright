class Hero
{
    constructor(name,role)
    {
        this.name=name;
        this.role=role;
        this.health=100;

    }

    heal()
    {
       this.health=this.health+10;
       console.log(this.name+"recovered 10 HP")
    }
    takeDamage(amount)
    {
        this.health=this.health-amount
        console.log(this.health+"damage")
    }
}

const myHero=new Hero("Argon","attacker");
myHero.takeDamage(30);
myHero.heal()
console.log(myHero.health);