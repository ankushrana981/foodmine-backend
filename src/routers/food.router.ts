import Router from 'express'
import { food_samples, sample_tags } from '../data';

const router = Router()
router.get('/foods', (req, res) => {
        return  res.send(food_samples);

});

router.get('foods/:foodId', (req, res) => {
          const food = food_samples.find(food => food.id === req.params.foodId);
          res.send(food);
})

router.get('foods/search/:searchTerm', (req, res) => {
          const food = food_samples.filter(food => food.name.toLowerCase().includes(req.params.searchTerm.toLowerCase()))

          if (food.length == 0) {
                    return res.status(404).send({ message: 'food not found' })
          }
          else res.send(food);
})

router.get('/tags', (req, res) => {
       return   res.send(sample_tags)
})

router.get('/tags/:tagName', (req, res) => {
          const filterTags = food_samples.filter(food => food.tags.includes(req.params.tagName))
          res.send(filterTags)
})

export default router;