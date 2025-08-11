<script lang="ts">
  import SplineWrapper from './homePage/SplineWrapper.svelte';
  
  // Example Spline scene URL - replace with your actual scene URL
  export let sceneUrl = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode';
  export let width = '100%';
  export let height = '400px';
</script>

<div class="spline-demo">
  <h3>Spline Scene with Watermark Removal</h3>
  
  <SplineWrapper 
    className="spline-container"
    style="width: {width}; height: {height};"
  >
    <!-- 
      If you're using React Spline, you would import and use it here:
      import Spline from '@splinetool/react-spline';
      <Spline scene={sceneUrl} />
      
      For Svelte, you might need to use a different approach or create a Svelte wrapper
      for the React Spline component.
    -->
    
    <!-- Placeholder for Spline component -->
    <div class="spline-placeholder">
      <p>Your Spline component would go here</p>
      <p>Scene URL: {sceneUrl}</p>
      <p>The watermark removal CSS is already applied!</p>
    </div>
  </SplineWrapper>
</div>

<style>
  .spline-demo {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 20px 0;
  }
  
  .spline-demo h3 {
    margin: 0 0 15px 0;
    color: #333;
  }
  
  .spline-container {
    border: 1px solid #eee;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .spline-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 20px;
  }
  
  .spline-placeholder p {
    margin: 5px 0;
    font-size: 14px;
  }
</style> 