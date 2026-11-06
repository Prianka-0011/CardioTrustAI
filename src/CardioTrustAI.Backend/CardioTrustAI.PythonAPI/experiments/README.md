Phase 1. Dataset understanding
Mostly completed
- Dataset loading and structure
- Column exploration
- SCP codes and diagnostic classes
- Class distribution
- Missing value analysis
- Patient distribution
  
  Phase 2. Statistical analysis and relationships
  Next focus
- Descriptive statistics
- Numerical feature distributions
- Pearson correlation
- Outlier detection
- Relationship between age, sex, height and weight
- Diagnostic class relationships
  
  Phase 3. Data quality assessment
- Missing value patterns
- Invalid or unrealistic values
- ECG signal quality
- Baseline drift and noise
- Lead integrity
- Sampling frequency and signal duration
  
  Phase 4. ECG signal exploration
- Load actual ECG waveforms
- Visualize all 12 leads
- Understand P, QRS and T waves
- Compare normal and abnormal ECGs
- Explore signal amplitude and duration
  
  Phase 5. Data preparation
- Parse SCP codes and diagnostic labels
- Handle missing metadata appropriately
- Signal preprocessing
- Signal normalization
- Resampling if required
- Prepare input features and target labels
  
  Phase 6. Dataset splitting
- Patient-level train/validation/test separation
- Verify no patient overlap
- Verify diagnostic class distributions
- Prepare final datasets for model development