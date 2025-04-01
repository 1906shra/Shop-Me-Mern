import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import "./style.css";
import { Collapse } from "react-collapse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Button } from "@mui/material";

const categories = [
  "Fashion",
  "Electronics",
  "Bags",
  "Footwear",
  "Beauty",
  "Wellness",
  "Jewellery",
];

const availabilityOptions = ["In Stock", "Out of Stock"];
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const colorOptions = ["Red", "Blue", "Green", "Black", "White", "Yellow"];

function SideBar() {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);
  const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
  const [isOpenColorFilter, setIsOpenColorFilter] = useState(true);
  const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(true);
  const [priceRange, setPriceRange] = useState([100, 10000]);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    availability: [],
    sizes: [],
    colors: [],
    price: [100, 10000],
  });

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => {
      const newValues = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: newValues };
    });
  };

  const applyFilters = () => {
    console.log("Applied Filters:", selectedFilters);
  };

  const resetFilters = () => {
    setSelectedFilters({
      categories: selectedFilters.categories, // Keep categories selected
      availability: [],
      sizes: [],
      colors: [],
      price: [100, 10000],
    });
    setPriceRange([100, 10000]);
  };

  return (
    <aside className="sidebar py-5">
      <div className="box">
        <h3 className="mb-3 text-[16px] font-[500] flex items-center justify-between">
          Price Range
          <Button
            className=" !text-black bg-none hover:text-[#FF3D3D] focus:outline-none"
            onClick={() => setIsOpenPriceFilter(!isOpenPriceFilter)}
          >
            {isOpenPriceFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenPriceFilter}>
          <div className="px-1">
            <Slider
              value={priceRange}
              onChange={(event, newValue) => {
                setPriceRange(newValue);
                setSelectedFilters((prev) => ({ ...prev, price: newValue }));
              }}
              valueLabelDisplay="auto"
              min={100}
              max={10000}
              sx={{ color: "#FF3D3D" }}
            />
          </div>
        </Collapse>

        <h3 className="mb-3 text-[16px] font-[500] flex items-center justify-between">
          Shop by Category
          <Button
            className=" !text-black bg-none hover:text-[#FF3D3D] focus:outline-none"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll max-h-[300px] overflow-y-auto px-1 relative left-[10px]">
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      sx={{ "&.Mui-checked": { color: "#FF3D3D" } }}
                      checked={selectedFilters.categories.includes(category)}
                      onChange={() => handleFilterChange("categories", category)}
                    />
                  }
                  label={category}
                  className="w-full"
                />
              ))}
            </FormGroup>
          </div>
        </Collapse>

        <h3 className="mb-3 text-[16px] font-[500] flex items-center justify-between">Size
          <Button onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}>
            {isOpenSizeFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenSizeFilter}>
          <FormGroup>
            {sizeOptions.map((size) => (
              <FormControlLabel
                key={size}
                control={<Checkbox checked={selectedFilters.sizes.includes(size)} onChange={() => handleFilterChange("sizes", size)} />}
                label={size}
              />
            ))}
          </FormGroup>
        </Collapse>

        <h3 className="mb-3 text-[16px] font-[500] flex items-center justify-between">Color
          <Button onClick={() => setIsOpenColorFilter(!isOpenColorFilter)}>
            {isOpenColorFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenColorFilter}>
          <FormGroup>
            {colorOptions.map((color) => (
              <FormControlLabel
                key={color}
                control={<Checkbox checked={selectedFilters.colors.includes(color)} onChange={() => handleFilterChange("colors", color)} />}
                label={color}
              />
            ))}
          </FormGroup>
        </Collapse>

        <div className="flex gap-2 mt-4">
  <Button onClick={resetFilters} variant="contained" color="error" className="w-1/4">
    Reset 
  </Button>
  <Button onClick={applyFilters} variant="contained" color="primary" className="w-1/4">
    Apply 
  </Button>
</div>
      </div>
    </aside>
  );
}

export default SideBar;
